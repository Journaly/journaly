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
  'fr',
  'pl',
  'it',
  'ru',
  'ko',
  'pt-br',
]

const LOCALE_NAME_MAP = {
  'de': 'German',
  'es': 'Spanish',
  'fr': 'French',
  'pl': 'Polish',
  'it': 'Italian',
  'ru': 'Russian',
  'ko': 'Korean',
  'pt-br': 'Portuguese (Brazil)',
}

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

const computeLocaleCompleteness = (localeReport) => {
  let total = 0
  let missing = 0
  let ood = 0

  for (ns in localeReport.namespaces) {
    for (translation of localeReport.namespaces[ns]) {
      total++

      if (translation.status === 'MISSING_TRANSLATION') {
        missing++
      } else if (translation.status === 'SOURCE_NEWER') {
        ood++
      }
    }
  }

  return [
    `${(100 * missing / total).toFixed(2)}%`,
    `${(100 * ood / total).toFixed(2)}%`,
  ]
}

const generateIndexHTML = async (report) => {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Journaly Translations</title>
    <style type="text/css">
      body {
        margin:40px auto;
        max-width:650px;
        line-height:1.6;
        font-size:18px;
        color:#444;
        padding:0 10px
      }
      h1,h2,h3 {
        line-height:1.2
      }
      table {
        width: 100%;
      }
      thead th {
        background-color: lightgray;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Help Translate Journaly!</h1>
    </header>
    <p>
      Journaly is currently accepting translations in ${LOCALES.length}
      languages other than English. We'd love to have your help improving these
      or translating the UI into new languages!
    </p>
    <p>
      To help translate one of the existing languages, find it in the table
      below, download the linked template, fill it out and email it to
      <a href="mailto:hello@journaly.com">hello@journaly.com</a>.
    </p>
    <p>
      To translate a language that isn't listed, drop us a line at
      <a href="mailto:hello@journaly.com">hello@journaly.com</a>.
      and we'll look at adding it. Since not every language has the same usage
      among our userbase, and because each translation requires maintainance
      effort, we may wait to add some languages until we find there is a
      significant demand, but generally we're open to translations. Contact
      us if you're not sure!
    </p>

    <h2>Some terminology</h2>
    <p>
      The section that follows contains some specialized language, if you've
      worked with software translations before it may be famililar, but just
      in case here's some of the terms we use and what they mean.
    </p>
    <ul>
      <li>
        "Strings" are simply pieces of text that are used in the site.
      </li>
      <li>
        "Copy" similarly refers to text, although "a piece of copy" may consist
        of multiple stings (e.g. several paragraphs may collectively be called
        a piece of copy, but each paragraph will be its own string)
      </li>
      <li>
        "Source" refers to copy as it was first written (in the case of Journaly
        all our copy is written in English, so the English copy is also the
        source copy)
      </li>
      <li>
        "Target" conversely is the language that copy is translated to from
        English.
      </li>
      <li>
        "Tone", "Register" and "Style" are related concepts that describe,
        roughly speaking, the emotional content of copy. Two sentences may mean
        the same thing (e.g. in English "hi" and "good afternoon" mean more or
        less the same thing, but have different tone, the later is more formal).
      </li>
    </ul>


    <h2>Filling out a Translation Template</h2>
    <p>
      The translation templates are CSV files, which is a simple spreadsheet
      format. There are a number of tools for working with CSVs, the most widely
      known is probably Microsoft Excel, but there are several free tools like:

      <ul>
        <li>Open Office (Windows, Mac, Linux)</li>
        <li>Table Tool (Mac)</li>
        <li>Google Sheets (Web)</li>
      </ul>
    </p>
    <p>
      You can use any program you like to edit CSV files, just keep in mind that
      some (including Google Sheets and Excel) will convert the file when you
      open it. So be sure to save/download your edits in the CSV format before
      sending them back to us.
    </p>
    <p>
      To fill out a template, simply look at the "Source String" column which
      contains the original English text, and enter the translation in the
      "Translated String" column. Some strings contain variables which are
      represented as "{{variable_name}}", which will be substituted with a
      value on the site. For example the read time string is
      "{{minutes}} min. read" in English and  "{{minutes}} Min. Lesezeit" in
      German. Use the same variable name in your translation, move it around if
      that's appropriate for the target language (e.g. it does not need to be
      at the start of the string in the target langauge, just because it's at
      the start in English), but keep the name the same.
    </p>
    <p>
      The "Translator Notes" column is not processed by the system, but it's
      there as a way for you, the translator, to communicate with us as
      developers. Feel free to ask questions, explain a particular translation,
      or generally record your thoughts. Your TL notes won't be revealed to
      anyone besides the core Journaly team.
    </p>
    <p>
      Please do not edit any columns other than "Translated String" and
      "Translator Notes" as this affects our ability to automatically process
      your submission.
    </p>
    <p>
      The "status" column records what the system has marked the translation as,
      e.g. is the translation missing, or has the English copy changed since the
      last time a translation was submitted. Sometimes translations will be
      marked out of date, even if they're still valid. If this is the case,
      simply add a translator note indicating it, and we'll mark it as up to
      date.
    </p>
    <p>
      Also feel free to review translations that are marked as being up to date.
      We generally trust the submissions we get and do not independently verify every translation,
      we've found that trusting people is generally warranted, but if you
      find a translation that could be improved, don't be afraid to do so.
    </p>

    <h2>Tone in Translations</h2>
    <p>
      Translation is difficult and inherently subjective. We generally leave it
      to the discresion of translators to determine what's appropriate. As a
      general guide, our English copy is usually written in a semi-casual
      tone, within the UI we <em>usually</em> avoid slang, but allow
      contractions and casual constructs. We try to make copy clearly
      communicate function, but avoid stiff or clinical language.
    </p>
    <p>
      In your translations, first consider what is natural for web content in
      your language. If your language has strict distinctions between registers,
      use whatever register is typical for websites. If there aren't hard and
      fast rules in your language, try to replicate the "semi-casual" tone from
      the English copy where possible.
    </p>
    <p>
      When translating copy that's idiomatic in English, don't be afraid to go
      off-script to come up with something that sounds natural in the target
      language. For example, the placeholder text for post title is "The
      Greatest Story Never Told...". This is a little tongue-in-cheek and if you
      think of something that's in the same spirit, but has a different literal
      translation, go for it! For informational text, like error messages, try
      to keep the translation more literal. Where literal translations vary from
      the English copy significantly, please leave a TL note to help us
      understand the change and how it will read in your language.
    </p>

    <table>
      <thead>
        <tr>
          <th>Language</th>
          <th>Template</th>
          <th>% Missing</th>
          <th>% Out of Date</th>
        </tr>
      </thead>
      </tbody>
      ${LOCALES.map(locale => {
        const [missing, ood] = computeLocaleCompleteness(report.locales[locale])
        return `
          <tr>
            <td>${LOCALE_NAME_MAP[locale]}</td>
            <td><a href="templates/${locale}.csv">${locale}.csv</a></td>
            <td>${missing}</td>
            <td>${ood}</td>
          </tr>
        `
      }).join('\n')}
      </tbody>
  </body>
</html>
  `

  await fs.writeFile(
    'translation-site/index.html',
    html,
    { encoding: 'UTF-8' }
  )
}

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

const generateTemplates = async (report) => {
  for (locale in report.locales) {
    const localeReport = report.locales[locale]
    const writer = createCsvWriter({
      path: `translation-site/templates/${locale}.csv`,
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
    let modifiedDoc
    try {
      modifiedDoc = await slurpFile(targetFilePath)
    } catch {
      // Assume missing file
      modifiedDoc = '{}'
    }

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

      const report = await generateAllLocalesReport()
      await generateTemplates(report)
      await generateIndexHTML(report)
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
