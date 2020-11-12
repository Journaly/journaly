import { InvalidInput, UserInputError } from './errors'

export const validateUpdateUserMutation = async (args: any, ctx: any): Promise<void> => {
  const { email, handle } = args
  const { userId } = ctx.request

  if (email || handle) {
    const invalidFields: InvalidInput[] = []

    if (email && !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i))
      invalidFields.push({ name: 'email', message: 'profile.error.emailValidationErrorMessage' })

    if (handle && !handle.match(/^[a-zA-Z0-9_-]{3,}$/i))
      invalidFields.push({ name: 'handle', message: 'profile.error.handleValidationErrorMessage' })

    if (invalidFields.length > 0) throw new UserInputError('User', invalidFields)

    const or = []
    if (email) or.push({ email: email })
    if (handle) or.push({ handle: handle })

    const users = await ctx.db.user.findMany({
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
      invalidFields.push({ name: 'handle', message: 'profile.error.handleAlreadyinUseError' })

    if (invalidFields.length > 0) throw new UserInputError('User', invalidFields)
  }
}
