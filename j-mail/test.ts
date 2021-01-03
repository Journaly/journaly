const { testFunc } = require('./handler')

const main = async () => {
  const bla = await testFunc()
  console.log(bla)
}

main()

export {}
