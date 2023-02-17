#!/usr/bin/env node

const { Pool } = require('pg')
const pgTag = require('pg-tag')
const yargs = require('yargs')

yargs
  .scriptName('jadmin')
  .command({
    command: 'delete-user <userId>',
    describe: 'Hard delete a user and related records',
    handler: async (args) => {
      const db = pgTag(
        new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      )

      const userId = parseInt(args.userId)

      const user = await db.get`
        SELECT *
        FROM "User"
        WHERE id = ${userId}
      `

      const query = db.transaction()

      await query`
        DELETE
        FROM "MembershipSubscription"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "PostClap"
        WHERE "authorId" = ${userId}
      `

      // We need to handle claps left by others on the post that is being deleted
      await query`
        DELETE
        FROM "Post"
        WHERE "authorId" = ${userId}
      `

      await query`
        DELETE
        FROM "PostComment"
        WHERE "authorId" = ${userId}
      `

      await query`
        DELETE
        FROM "PostCommentSubscription"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "UserBadge"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "PendingNotification"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "LanguageRelation"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "InAppNotification"
        WHERE "userId" = ${userId} OR "triggeringUserId" = ${userId}
      `

      await query`
        DELETE
        FROM "Comment"
        WHERE "authorId" = ${userId}
      `

      await query`
        DELETE
        FROM "CommentThanks"
        WHERE "authorId" = ${userId}
      `

      await query`
        DELETE
        FROM "Auth"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "User"
        WHERE "id" = ${userId}
      `

      await query.commit()

      console.table(user)
    },
  })
  .demandCommand(1)
  .parse(process.argv.slice(2))
