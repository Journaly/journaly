if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../backend/src/graphql')

app.assemble()

export default app.server.handlers.playground
