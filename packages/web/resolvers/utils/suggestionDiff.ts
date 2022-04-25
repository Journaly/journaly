type Memo = {
  [a: string]: string
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

export { longestCommonSubsequence }
