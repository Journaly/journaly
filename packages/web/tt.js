#!/usr/bin/env node

const cbfs = require('fs')
const fs = require('fs/promises')
const path = require('path')

const NodeGit = require('nodegit')
const jsonParser = require('jsonc-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const CsvReadableStream = require('csv-reader');
const CLIProgress = require('cli-progress');

const LOCALES = [
  'de',
  'es',
]

const NAMESPACES = [
  'authentication',
  'comment',
  'common',
  'my-feed',
  'my-posts',
  'post-author-card',
  'post',
  'profile',
  'settings',
]

const HEADER_SPEC = [
  { id: 'namespace', title: 'namespace' },
  { id: 'fullId', title: 'key' },
  { id: 'status', title: 'status' },
  { id: 'source', title: 'Source String' },
  { id: 'target', title: 'Translated String' },
  { id: 'tlnotes', title: 'Translator Notes' },
  { id: 'lastCommitSHA', title: 'Last Commit to Source' },
]

let _progressBar = null

const initProgress = () => {
  _progressBar = new CLIProgress.SingleBar({}, CLIProgress.Presets.shades_classic)
  _progressBar.start(LOCALES.length * NAMESPACES.length + LOCALES.length, 0)
}

const reportProgress = () => {
  _progressBar && _progressBar.increment()
}

const stopProgress = () => {
  _progressBar && _progressBar.stop()
}


const slurpFile = async (path) => {
  return await fs.readFile(path, { encoding: 'UTF-8' });
}

const getTranslations = (jsonStr) => {
  const tree = jsonParser.parseTree(jsonStr)
  const lineByOffset = new Array(jsonStr.length)
  let lineNo = 1

  for (let i=0; i<jsonStr.length; i++) {
    lineByOffset[i] = lineNo

    if (jsonStr[i] === '\n') {
      lineNo++
    }
  }

  return getProperties(tree, lineByOffset)
}

const getProperties = (tree, lineByOffset, path=[]) => {
  const properties = []

  for (node of tree.children) {
    const [key, value] = node.children

    if (value.type === 'string') {
      const totalPath = path.concat([key.value])

      properties.push({
        path: totalPath,
        fullId: totalPath.join('.'),
        line: lineByOffset[value.offset],
        key,
        value,
      })
    } else if (value.type === 'object') {
      properties.push(
        ...getProperties(value, lineByOffset, path.concat([key.value]))
      )
    } else {
      throw new Error(`Unexpected node type: ${node.type}`)
    }
  }

  return properties
}

const getAnnotatedTranslations = async (repo, filePath) => {
  const resolvedFilePath = path.resolve(`../../${filePath}`)

  try {
    await fs.stat(resolvedFilePath)
  } catch {
    // If no file exists, there are no translations or annotations to provide.
    return {}
  }

  const [blame, fileStr] = await Promise.all([
    NodeGit.Blame.file(repo, filePath),
    slurpFile(resolvedFilePath),
  ])
  const translations = getTranslations(fileStr)

  const annotated = {}

  for (translation of translations) {
    const hunk = blame.getHunkByLine(translation.line)
    const commit = await repo.getCommit(hunk.finalCommitId())

    annotated[translation.fullId] = {
      ...translation,
      lastCommitSHA: commit.sha(),
      lastCommitMessage: commit.message(),
      lastCommitDate: commit.date(),
      lastComitter: commit.committer().name(),
    }
  }

  return annotated
}

const compareTranslationFiles = async (repo, sourceFilePath, targetFilePath) => {
  const sourceAnnotations = await getAnnotatedTranslations(repo, sourceFilePath)
  const targetAnnotations = await getAnnotatedTranslations(repo, targetFilePath)

  const sourceIds = new Set([])
  const merged = []

  for (sourceKey in sourceAnnotations) {
    const sourceAnnotation = sourceAnnotations[sourceKey]
    const targetAnnotation = targetAnnotations[sourceKey]

    if (!targetAnnotation) {
      merged.push({
        source: sourceAnnotation,
        target: null,
        status: 'MISSING_TRANSLATION'
      })
      continue
    }

    sourceIds.add(sourceKey)

    if (targetAnnotation.lastCommitDate < sourceAnnotation.lastCommitDate) {
      merged.push({
        source: sourceAnnotation,
        target: targetAnnotation,
        status: 'SOURCE_NEWER'
      })
    } else {
      merged.push({
        source: sourceAnnotation,
        target: targetAnnotation,
        status: 'UP_TO_DATE'
      })
    }
  }

  return merged
}

const generateAllLocalesReport = async () => {
  const repo = await NodeGit.Repository.open(path.resolve('../../'))

  const report = {
    locales: {}
  }

  for (locale of LOCALES) {
    const localeReport = {
      namespaces: {}
    }

    for (ns of NAMESPACES) {
      const comparison = await compareTranslationFiles(
        repo,
        `packages/web/public/static/locales/en/${ns}.json`,
        `packages/web/public/static/locales/${locale}/${ns}.json`,
      )

      localeReport.namespaces[ns] = comparison
      reportProgress()
    }

    report.locales[locale] = localeReport
  }

  return report
}

const generateTemplates = async () => {
  const report = await generateAllLocalesReport()

  for (locale in report.locales) {
    const localeReport = report.locales[locale]
    const writer = createCsvWriter({
      path: `translation-templates/${locale}.csv`,
      header: HEADER_SPEC,
    })

    const records = []

    for (ns in localeReport.namespaces) {
      const nsReport = localeReport.namespaces[ns]

      for (comp of nsReport) {
        records.push({
          'namespace': ns,
          fullId: comp.source.fullId,
          status: comp.status,
          source: comp.source.value.value,
          target: comp.target ? comp.target.value.value : '',
          tlnotes: '',
          lastCommitSHA: comp.source.lastCommitSHA
        })
      }
    }

    writer.writeRecords(records)
    reportProgress()
  }

  stopProgress()
}

const ingestFile = async (locale, file) => {
  const inputStream = cbfs.createReadStream(file, 'utf8')
  const records = await (new Promise((res, rej) => {
    const records = []

    inputStream
      .pipe(new CsvReadableStream({ skipHeader: true }))
      .on('data', function (row) {
        const record = {}
        for (let i=0; i<row.length; i++) {
          record[HEADER_SPEC[i].id] = row[i]
        }
        if (record.target) {
          records.push(record)
        }
      })
      .on('end', function () {
        res(records)
      })
  }))

  const recordsByNamespace = {}

  for (record of records) {
    if (!(record.namespace in recordsByNamespace)) {
      recordsByNamespace[record.namespace] = {}
    }

    recordsByNamespace[record.namespace][record.fullId] = record
  }

  for (ns in recordsByNamespace) {
    const targetFilePath = `../../packages/web/public/static/locales/${locale}/${ns}.json`
    let modifiedDoc = await slurpFile(targetFilePath)

    for (fullId in recordsByNamespace[ns]) {
      const record = recordsByNamespace[ns][fullId]
      modifiedDoc = jsonParser.applyEdits(
        modifiedDoc, 
        jsonParser.modify(
          modifiedDoc,
          fullId.split('.'),
          record.target,
          {
            formattingOptions: {
              tabSize: 2,
              insertSpaces: true,
              eol: '\n',
            }
          }
        )
      )
    }

    await fs.writeFile(
      targetFilePath,
      modifiedDoc,
      { encoding: 'UTF-8' }
    )
  }
}

require('yargs/yargs')(process.argv.splice(2))
  .command({
    command: 'generate',
    describe: 'Output translation template CSVs',
    handler: async (argv) => {
      if (argv.progress) {
        initProgress()
      }

      await generateTemplates()
    },
    builder: (yargs) => (
      yargs
        .positional('progress', {
          boolean: 'true',
          default: false,
        })
    )
  })
  .command({
    command: 'ingest',
    describe: 'Ingest a filled out translation CSV into the translations',
    builder: (yargs) => (
      yargs
        .positional('locale', {
          choices: LOCALES,
          desc: 'The locale (language) the CSV applies to.'
        })
        .require('locale')
        .positional('file', {
          desc: 'The CSV file to ingest',
        })
        .require('file')
    ),
    handler: async (argv) => {
      await ingestFile(argv.locale, argv.file)
    }
  })
  .demandCommand()
  .help()
  .argv
