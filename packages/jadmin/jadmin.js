#!/usr/bin/env node

const { Pool } = require('pg')
const pgTag = require('pg-tag')
const yargs = require('yargs')
const prompts = require('prompts')
const { parse } = require('pg-connection-string')

async function deletePosts(postIds, query) {
  if (!postIds.length) return

  await query`
    DELETE
    FROM "PostClap"
    WHERE "postId" IN (${postIds})
  `

  await query`
    DELETE
    FROM "PostCommentSubscription"
    WHERE "postId" IN (${postIds})
  `

  await query`
    DELETE
    FROM "PostTopic"
    WHERE "postId" IN (${postIds})
  `

  await query`
    DELETE
    FROM "Comment"
    USING "Thread"
    WHERE "Comment"."threadId" = "Thread"."id"
      AND "postId" IN (${postIds})
  `

  await query`
    DELETE
    FROM "Thread"
    WHERE "postId" IN (${postIds})
  `

  await query`
    DELETE
    FROM "PostComment"
    WHERE "postId" IN (${postIds})
  `

  await query`
        DELETE
        FROM "Post"
        WHERE "id" IN (${postIds})
      `

  await query`
    DELETE
    FROM "InAppNotification"
    WHERE "postId" IN (${postIds})
  `
}

yargs
  .scriptName('jadmin')
  .command({
    command: 'delete-user <userId>',
    describe: 'Hard delete a user and related records',
    builder: (yargs) => {
      yargs.option('force', {
        describe: 'Bypass interactive safety checks',
        type: 'boolean',
      })
      yargs.option('database-url', {
        describe: 'The URL to connect to the database',
        type: 'string',
      })
    },
    handler: async (args) => {
      const dbUrl = args.databaseUrl || process.env.DATABASE_URL

      if (!dbUrl) {
        console.error('No database URL has been provided')
        process.exit(1)
      }

      const parsedDbUrl = parse(dbUrl)
      let promptResponse

      if (!['localhost', '127.0.0.1'].includes(parsedDbUrl.host) && !args.force) {
        promptResponse = await prompts({
          type: 'confirm',
          name: 'confirmDbUrl',
          message: `CAUTION: your $DATABASE_URL is currently set to a remote database: ${dbUrl}. Are you sure you want to continue?`,
        })

        if (!promptResponse.confirmDbUrl) return
      }

      const db = pgTag(
        new Pool({
          connectionString: dbUrl,
        }),
      )

      const userId = parseInt(args.userId)

      const user = await db.get`
        SELECT *
        FROM "User"
        WHERE id = ${userId}
      `

      if (!user) {
        console.error(`No User with ID ${userId} found`)
        process.exit(1)
      }

      if (!args.force) {
        promptResponse = await prompts({
          type: 'confirm',
          name: 'confirmUserByHandle',
          message: `Are you sure you want to delete User: handle: ${user.handle}, email: ${
            user.email
          }, ${user.name ? user.name : 'no name'}`,
        })

        if (!promptResponse.confirmUserByHandle) return
      }

      const query = db.transaction()
      // const query = db.query

      const postIds = (
        await db.all`
        SELECT id
        FROM "Post"
        WHERE "authorId" = ${userId}
      `
      ).map((post) => post.id)


      await deletePosts(postIds, query)

      await query`
        DELETE
        FROM "SocialMedia"
        WHERE "userId" = ${userId}
      `

      await query`
        DELETE
        FROM "UserInterest"
        WHERE "userId" = ${userId}
      `

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
        FROM "InAppNotification"
        WHERE "triggeringUserId" = ${userId}
      `

      await query`
        DELETE
        FROM "User"
        WHERE "id" = ${userId}
      `

      await query.commit()

      console.table(user)
      await db.pool.end()
    },
  })
  .demandCommand(1)
  .parse(process.argv.slice(2))
