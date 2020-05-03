const fs = require('fs')
const path = require('path')
const svgr = require('@svgr/core').default
const prompts = require('prompts')
const svgoConfig = {
  plugins: [
    { removeViewBox: false },
    { removeAttrs: { attrs: ['data-name', 'id'] } },
  ],
}

let componentName
const svgComponentsDirectory = path.join(__dirname, '../components/Icons')

function importSvg(svgPath) {
  fs.readFile(svgPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(
          `Error! No file found at ${err.path}. Please check the file path and try again.`,
        )
      } else {
        throw err
      }
      return
    }

    convertSvgToReactComponent(data)
  })
}

function convertSvgToReactComponent(svg) {
  svgr(
    svg,
    {
      typescript: true,
      svgoConfig,
      plugins: [
        '@svgr/plugin-svgo',
        '@svgr/plugin-jsx',
        '@svgr/plugin-prettier',
      ],
    },
    { componentName },
  )
    .then((svgReactComponent) => {
      writeComponentToFile(svgReactComponent)
    })
    .catch((error) => {
      throw error
    })
}

function writeComponentToFile(component) {
  const newFileName = `${componentName}.tsx`
  const outputPath = `${svgComponentsDirectory}/${newFileName}`

  fs.writeFile(outputPath, component, (err) => {
    if (err) return console.log(err)
    console.log(
      `Success! ${newFileName} has been written to ${svgComponentsDirectory}/`,
    )
  })
}

const questions = [
  {
    type: 'text',
    name: 'pathToSvg',
    message: "What's the path to the SVG you want to componentize?",
    validate: (input) => {
      if (!input.endsWith('.svg')) {
        return 'Make sure the path ends in .svg, e.g. path/to/file.svg'
      }
      return true
    },
  },
  {
    type: 'text',
    name: 'componentName',
    message: 'What do you want the SVG component to be called?',
    validate: (input) => {
      if (input.includes('.')) {
        return "Pleaes omit the file extension when naming your component. 'Circle' will generate Circle.tsx"
      } else if (input.toLowerCase().endsWith('icon')) {
        return "Do not include 'Icon' in the component name"
      }
      return true
    },
  },
]

function onCancel() {
  console.log(
    'The `import-svg` command has been cancelled. No SVG was converted.',
  )
}

;(async () => {
  const answers = await prompts(questions, { onCancel })

  // Cancelling during prompts with ctrl + c will return answers with no keys
  if (Object.keys(answers).length > 0) {
    componentName = answers.componentName
    importSvg(answers.pathToSvg)
  }
})()
