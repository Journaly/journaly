#!/usr/bin/env node

const { Pool } = require('pg')
const pgTag = require('pg-tag')
const yargs = require('yargs')

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
}

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
      // const query = db.query

      const postIds = (
        await db.all`
        SELECT id
        FROM "Post"
        WHERE "authorId" = ${userId}
      `
      ).map((post) => post.id)

      console.log(postIds)

      await deletePosts(postIds, query)

      console.log('test')

      await query`
        DELETE
        FROM "MembershipSubscription"
        WHERE "userId" = ${userId}
      `

      console.log('test2')

      await query`
        DELETE
        FROM "PostClap"
        WHERE "authorId" = ${userId}
      `
      console.log('test3')

      // We need to handle claps left by others on the post that is being deleted
      await query`
        DELETE
        FROM "Post"
        WHERE "authorId" = ${userId}
      `
      console.log('test PostComment')

      await query`
        DELETE
        FROM "PostComment"
        WHERE "authorId" = ${userId}
      `
      console.log('test PostCommentSubscription')

      await query`
        DELETE
        FROM "PostCommentSubscription"
        WHERE "userId" = ${userId}
      `
      console.log('test UserBadge')

      await query`
        DELETE
        FROM "UserBadge"
        WHERE "userId" = ${userId}
      `
      console.log('test PendingNotification')

      await query`
        DELETE
        FROM "PendingNotification"
        WHERE "userId" = ${userId}
      `
      console.log('test LanguageRelation')

      await query`
        DELETE
        FROM "LanguageRelation"
        WHERE "userId" = ${userId}
      `
      console.log('test InAppNotification')

      await query`
        DELETE
        FROM "InAppNotification"
        WHERE "userId" = ${userId} OR "triggeringUserId" = ${userId}
      `
      console.log('test Comment')

      await query`
        DELETE
        FROM "Comment"
        WHERE "authorId" = ${userId}
      `
      console.log('test CommentThanks')

      await query`
        DELETE
        FROM "CommentThanks"
        WHERE "authorId" = ${userId}
      `
      console.log('test Auth')

      await query`
        DELETE
        FROM "Auth"
        WHERE "userId" = ${userId}
      `
      console.log('test User')

      await query`
        DELETE
        FROM "User"
        WHERE "id" = ${userId}
      `
      console.log('test user')

      await query.commit()

      console.table(user)
      await db.pool.end()
    },
  })
  .demandCommand(1)
  .parse(process.argv.slice(2))
