const fs = require('fs/promises')
const path = require('path')

const NodeGit = require('nodegit')
const jsonParser = require('jsonc-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

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

const reportCLI = (comparison) => {
  const missing = comparison.filter(({ status }) => status === 'MISSING_TRANSLATION')
  const needsUpdate = comparison.filter(({ status }) => status === 'SOURCE_NEWER')
  const upToDate = comparison.filter(({ status }) => status === 'UP_TO_DATE')

  if (missing.length) {
    console.log('========== Missing Translations ========== ')
    for (comp of missing) {
      console.log(`- ${comp.source.fullId}`)
    }
    console.log('')
  }

  if (needsUpdate.length) {
    console.log('========== Out of Date Translations ========== ')
    for (comp of needsUpdate) {
      console.log(`- ${comp.source.fullId}`)
    }
    console.log('')
  }

  console.log(`Checked ${comparison.length} translations:`)
  console.log(`up to date: ${upToDate.length}, out of date: ${needsUpdate.length}, missing: ${missing.length}`)
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
    }

    report.locales[locale] = localeReport
  }

  return report
}

const doThing = async () => {
  const report = await generateAllLocalesReport()

  for (locale in report.locales) {
    const localeReport = report.locales[locale]
    const writer = createCsvWriter({
      path: `translation-templates/${locale}.csv`,
      header: [
        { id: 'namespace', title: 'namespace' },
        { id: 'fullId', title: 'key' },
        { id: 'status', title: 'status' },
        { id: 'source', title: 'Source String' },
        { id: 'target', title: 'Translated String' },
        { id: 'tlnotes', title: 'Translator Notes' },
        { id: 'lastCommitSHA', title: 'Last Commit to Source' },
      ]
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
  }
}

doThing()
