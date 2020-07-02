export class ResolverError extends Error {
  constructor(message, extensions) {
    super(message)
    this.extensions = extensions
    this.statusCode = 404
    this.status = 404
  }
}

export class NotFoundError extends ResolverError {
  constructor(resourceName = 'Resource') {
    super(`${resourceName} not found`, { code: 'NOT_FOUND', statusCode: 404 })
  }
}

export class NotAuthorizedError extends ResolverError {
  constructor() {
    super('Not authorized to access resource', {
      code: 'NOT_AUTHORIZED',
      statusCode: 403,
    })
  }
}
