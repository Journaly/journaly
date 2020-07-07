import server from '../app'

export default (req: any, res: any) => {
  server.handlers.graphql(req, res)
}
