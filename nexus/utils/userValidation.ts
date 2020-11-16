import { integer } from 'aws-sdk/clients/cloudfront'
import { InvalidInput, UserInputError } from '../errors'

const CheckIfMatchPattern = (email?: string, handle?: string): InvalidInput[] => {
  const handleRegex = /^[a-zA-Z0-9_-]{3,}$/i
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  const invalidFields: InvalidInput[] = []

  if (email && !email.match(emailRegex))
    invalidFields.push({
      name: 'email',
      message: 'profile.error.emailValidationErrorMessage',
    })

  if (handle && !handle.match(handleRegex))
    invalidFields.push({
      name: 'handle',
      message: 'profile.error.handleValidationErrorMessage',
    })

  return invalidFields
}

const CheckIfUnique = async (
  db: any,
  userId: integer,
  email?: string,
  handle?: string,
): Promise<InvalidInput[]> => {
  const invalidFields: InvalidInput[] = []

  const or = []
  if (email) or.push({ email: email })
  if (handle) or.push({ handle: handle })

  const users = await db.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: userId,
          },
        },
        or.length == 1 ? or[0] : { OR: or },
      ],
    },
  })

  if (email && users.some((u: any) => u.email === email))
    invalidFields.push({ name: 'email', message: 'profile.error.emailAlreadyinUseError' })

  if (handle && users.some((u: any) => u.handle === handle))
    invalidFields.push({
      name: 'handle',
      message: 'profile.error.handleAlreadyinUseError',
    })

  return invalidFields
}

export const validateUpdateUserMutationData = async (args: any, ctx: any): Promise<void> => {
  const { email, handle } = args
  const { userId } = ctx.request

  if (email || handle) {
    const patternCheckResult = CheckIfMatchPattern(email, handle)
    if (patternCheckResult.length > 0) throw new UserInputError('User', patternCheckResult)

    const uniqueCheckResult = await CheckIfUnique(ctx.db, userId, email, handle)
    if (uniqueCheckResult.length > 0) throw new UserInputError('User', uniqueCheckResult)
  }
}
