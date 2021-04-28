const fs = require('fs/promises')
const path = require('path')
const jsonParser = require('jsonc-parser')

const NodeGit = require('nodegit')

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
  const [blame, fileStr] = await Promise.all([
    NodeGit.Blame.file(repo, filePath),
    slurpFile(path.resolve(`../../${filePath}`)),
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

const compareTranslations = async (repo, sourceFilePath, targetFilePath) => {
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

const doThing = async () => {
  const repo = await NodeGit.Repository.open(path.resolve('../../'))
  const comparison = await compareTranslations(
    repo,
    'packages/web/public/static/locales/en/common.json',
    'packages/web/public/static/locales/de/common.json'
  )

  reportCLI(comparison)
}

doThing()
