type Memo = {
  [a: string]: string
}

const suggestionDiff = (originalStr: string, suggestedStr: string) => {
  const lcs = longestCommonSubsequence(originalStr, suggestedStr)

  const oldStr = []
  const newStr = []
  let oldIdx = 0
  let newIdx = 0
  let idx = 0
  while (idx < lcs.length) {
    const deletions: string[] = []
    while (originalStr[oldIdx] !== lcs[idx]) {
      deletions.push(originalStr[oldIdx])
      oldIdx++
    }
    deletions.length && oldStr.push(['-', deletions.join('')])

    const additions: string[] = []
    while (suggestedStr[newIdx] !== lcs[idx]) {
      additions.push(suggestedStr[newIdx])
      newIdx++
    }
    additions.length && newStr.push(['+', additions.join('')])

    const unchanged: string[] = []
    while (
      idx < suggestedStr.length &&
      originalStr[oldIdx] === lcs[idx] &&
      suggestedStr[newIdx] === lcs[idx]
    ) {
      unchanged.push(lcs[idx])
      idx++
      oldIdx++
      newIdx++
    }
    oldStr.push([' ', unchanged.join('')])
    newStr.push([' ', unchanged.join('')])
  }

  while (oldIdx < originalStr.length) {
    oldStr.push(['-', originalStr[oldIdx]])
    oldIdx++
  }

  while (newIdx < suggestedStr.length) {
    newStr.push(['+', suggestedStr[newIdx]])
    newIdx++
  }

  return {
    lcs,
    oldStr,
    newStr,
  }
}

// TODO: Optimize string concatentation
const longestCommonSubsequence = (
  str1: string,
  str2: string,
  i: number = 0,
  j: number = 0,
  memo: Memo = {},
) => {
  const position = `${i}-${j}`
  if (position in memo) return memo[position]

  if (i === str1.length || j === str2.length) return ''
  if (str1[i] === str2[j]) {
    memo[position] = str1[i] + longestCommonSubsequence(str1, str2, i + 1, j + 1, memo)
  } else {
    const result1 = longestCommonSubsequence(str1, str2, i + 1, j, memo)
    const result2 = longestCommonSubsequence(str1, str2, i, j + 1, memo)

    if (result1.length > result2.length) {
      memo[position] = result1
    } else {
      memo[position] = result2
    }
  }

  return memo[position]
}

export { longestCommonSubsequence, suggestionDiff }
