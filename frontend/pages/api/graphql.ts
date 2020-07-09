if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../backend/src/graphql')
require('../../backend/src/app')

app.assemble()

export default app.server.handlers.graphql
