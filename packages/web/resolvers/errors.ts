export class ResolverError extends Error {
  extensions: any
  constructor(message: string, extensions: any) {
    super(message)
    this.extensions = extensions
  }
}

export class NotFoundError extends ResolverError {
  constructor(resourceName = 'Resource') {
    super(`${resourceName} not found`, { code: 'NOT_FOUND', statusCode: 404 })
  }
}

export type InvalidInput = {
  name: string
  message: string
}

export class UserInputError extends ResolverError {
  constructor(resourceName = 'Resource', validationErrors: InvalidInput[] = []) {
    super(`${resourceName} bad request`, { code: 'BAD_REQUEST', statusCode: 400, validationErrors })
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
