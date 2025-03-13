// TODO (this PR): cite original source
// ALSO: Add types to everything!

const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g

type ParsedAcceptLang = {
  code: string
  script: string | null
  region: string
  quality: number
}

function parse(acceptLanguage: string): ParsedAcceptLang[] {
  const strings = (acceptLanguage || '').match(regex) ?? []
  return (
    strings
      .map(function (m): ParsedAcceptLang | undefined {
        if (!m) {
          return
        }

        const bits = m.split(';')
        const ietf = bits[0].split('-')
        const hasScript = ietf.length === 3
        return {
          code: ietf[0],
          script: hasScript ? ietf[1] : null,
          region: hasScript ? ietf[2] : ietf[1],
          quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
        }
      })
      .filter(Boolean) as ParsedAcceptLang[]
  ).sort(function (a, b) {
    return b.quality - a.quality
  })
}

export default function pick(
  supportedLanguages: string[],
  acceptLanguage: ParsedAcceptLang[] | string | null,
) {
  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
    return null
  }

  if (typeof acceptLanguage === 'string') {
    acceptLanguage = parse(acceptLanguage)
  }

  const supported = supportedLanguages.map(function (support) {
    const bits = support.split('-')
    const hasScript = bits.length === 3

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1],
    }
  })

  for (let i = 0; i < acceptLanguage.length; i++) {
    const lang = acceptLanguage[i]
    const langCode = lang.code.toLowerCase()
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script
    let bestMatch
    let bestRank = 0

    for (let j = 0; j < supported.length; j++) {
      const supportedCode = supported[j].code.toLowerCase()
      let supportedScript = supported[j].script
      supportedScript = supportedScript?.toLowerCase() ?? null
      const supportedRegion = supported[j].region
        ? supported[j].region.toLowerCase()
        : supported[j].region
      if (langCode === supportedCode) {
        const supportedRank =
          3 + (supportedScript === langScript ? 1 : 0) + (supportedRegion === langRegion ? 2 : 0)
        if (supportedRank > bestRank) {
          bestRank = supportedRank
          bestMatch = supportedLanguages[j]
        }
      }
    }
    if (bestMatch) return bestMatch
  }

  return null
}
