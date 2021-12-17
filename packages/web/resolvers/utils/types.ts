import { Prisma } from '@journaly/j-db-client'

type WrapIncludeRecursive<T> = T extends true
  ? T
  : {
    include: {
      [P in keyof T]: WrapIncludeRecursive<T[P]>
    }
  }

type UserWithRels<T> = NonNullable<
  Prisma.UserGetPayload<
    WrapIncludeRecursive<T>
  >
>

type ThreadWithRels<T> = NonNullable<
  Prisma.ThreadGetPayload<
    WrapIncludeRecursive<T>
  >
>

export type {
  UserWithRels,
  ThreadWithRels,
}
