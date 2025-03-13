// TODO (this PR): cite original source
// ALSO: Add types to everything!

var regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g

var isString = function (s) {
  return typeof s === 'string'
}

function parse(al) {
  var strings = (al || '').match(regex)
  return strings
    .map(function (m) {
      if (!m) {
        return
      }

      var bits = m.split(';')
      var ietf = bits[0].split('-')
      var hasScript = ietf.length === 3
      return {
        code: ietf[0],
        script: hasScript ? ietf[1] : null,
        region: hasScript ? ietf[2] : ietf[1],
        quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
      }
    })
    .filter(function (r) {
      return r
    })
    .sort(function (a, b) {
      return b.quality - a.quality
    })
}

export default function pick(supportedLanguages, acceptLanguage) {
  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
    return null
  }

  if (isString(acceptLanguage)) {
    acceptLanguage = parse(acceptLanguage)
  }

  var supported = supportedLanguages.map(function (support) {
    var bits = support.split('-')
    var hasScript = bits.length === 3

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1],
    }
  })

  for (var i = 0; i < acceptLanguage.length; i++) {
    var lang = acceptLanguage[i]
    var langCode = lang.code.toLowerCase()
    var langRegion = lang.region ? lang.region.toLowerCase() : lang.region
    var langScript = lang.script ? lang.script.toLowerCase() : lang.script
    let bestMatch
    let bestRank = 0

    for (var j = 0; j < supported.length; j++) {
      var supportedCode = supported[j].code.toLowerCase()
      var supportedScript = supported[j].script
        ? supported[j].script.toLowerCase()
        : supported[j].script
      var supportedRegion = supported[j].region
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
