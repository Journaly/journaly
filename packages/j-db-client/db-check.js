#!/usr/bin/env node

const readline = require('readline')

// Shamelessly copy pasted off of SO
const url2obj = (url) => {
  const pattern = /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/
  const matches =  url.match(pattern)
  const params = {}
  if (matches[5] != undefined) {
    matches[5].split('&').map((x) => {
      var a = x.split('=')
      params[a[0]]=a[1]
    })
  }

  return {
    protocol: matches[1],
    user: matches[2] != undefined ? matches[2].split(':')[0] : undefined,
    password: matches[2] != undefined ? matches[2].split(':')[1] : undefined,
    host: matches[3],
    hostname: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[0] : undefined,
    port: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[1] : undefined,
    segments : matches[4] != undefined ? matches[4].split('/') : undefined,
    params: params 
  }
}

const { hostname } = url2obj(process.env.DATABASE_URL)

if (!(hostname === 'localhost' || hostname === '127.0.0.1')) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(
    `DATABASE_URL is: ${process.env.DATABASE_URL} which is not a local address, if it points to prod you could be doing some real damage. Are you sure you want to continue?\n[y/N] `,
    (answer) => {
      if (!(answer.toLowerCase() === 'y')) {
        console.error('Bailing. Probably a smart move')
        process.exitCode = 1
      }

      rl.close()
    }
  )
}
