type Memo = {
  [a: string]: string
}

const suggestionDiff = (originalStr: string, suggestedStr: string) => {
  const lcs = longestCommonSubsequence(originalStr, suggestedStr)

  let idx1 = 0
  let idx1Next = 0
  let idx2 = 0
  let idx2Next = 0
  const additions = []
  const deletions = []
  const unchanged = []

  const oldStr = []
  const newStr = []
  let oldIdx = 0
  let newIdx = 0

  for (let idx = 0; idx < lcs.length; idx += 1) {
    idx1Next = originalStr.indexOf(lcs[idx], idx1)
    idx2Next = suggestedStr.indexOf(lcs[idx], idx2)

    while (originalStr[oldIdx] !== lcs[idx]) {
      oldStr.push(['-', originalStr[oldIdx]])
      oldIdx++
    }

    while (suggestedStr[newIdx] !== lcs[idx]) {
      newStr.push(['+', suggestedStr[newIdx]])
      newIdx++
    }

    oldStr.push([' ', originalStr[oldIdx]])
    newStr.push([' ', suggestedStr[newIdx]])

    oldIdx++
    newIdx++

    // deletions.push(`x${originalStr.substring(idx1, idx1Next)}x`)
    // additions.push(`+${suggestedStr.substring(idx2, idx2Next)}+`)

    // additions.push(lcs[idx])
    // deletions.push(lcs[idx])

    // idx1 = idx1Next + 1
    // idx2 = idx2Next + 1
  }

  while (oldIdx < originalStr.length) {
    oldStr.push(['-', originalStr[oldIdx]])
    oldIdx++
  }

  while (newIdx < suggestedStr.length) {
    newStr.push(['+', suggestedStr[newIdx]])
    newIdx++
  }

  // additions.push(`+${suggestedStr.substring(idx2)}+`)
  // deletions.push(`x${originalStr.substring(idx1)}x`)

  return {
    lcs,
    // additions: additions.join(''),
    // deletions: deletions.join(''),
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
