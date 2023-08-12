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

async function getDb(args) {
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

  return db
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
      const db = await getDb(args)
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
  .command({
    command: 'delete-post <postId>',
    describe: 'Hard delete a post and related records',
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
      const db = await getDb(args)
      const postId = parseInt(args.postId)
      const post = await db.get`
        SELECT *
        FROM "Post"
        WHERE id = ${postId}
      `

      if (!post) {
        console.error(`No Post with ID ${postId} found`)
        process.exit(1)
      }

      const userId = post.authorId
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
          message: `Are you sure you want to delete post: ${post.title} by User handle: ${
            user.handle
          }, email: ${user.email}, ${user.name ? user.name : 'no name'}?`,
        })

        if (!promptResponse.confirmUserByHandle) return
      }

      const query = db.transaction()

      await deletePosts([postId], query)
      await query.commit()

      console.table(post)
      await db.pool.end()
    },
  })
  .command({
    command: 'assign-badge <userId> <badgeName>',
    describe: 'Assign a badge to a user',
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
      const db = await getDb(args)
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

      const badgeOptionsResponse = (
        await db.get`
        SELECT enum_range(NULL::"BadgeType");
      `
      ).enum_range
      const badgeOptions = badgeOptionsResponse.substr(1, badgeOptionsResponse.length - 2)
      const badgeOptionsArray = badgeOptions.split(',')
      console.log('badgeName', args.badgeName, typeof args.badgeName)
      console.log('badgeOptionsResponse', badgeOptionsResponse)
      console.log('badgeOptions', badgeOptions)
      console.log('badgeOptionsArray', badgeOptionsArray)
      if (badgeOptionsArray.includes(args.badgeName)) {
        await db.query`
          INSERT INTO "UserBadge"
          VALUES (DEFAULT, ${args.badgeName}, DEFAULT, ${userId});
        `
      } else {
        console.error(`No badge called ${args.badgeName} found`)
        process.exit(1)
      }

      console.log(`Successfully added badge: ${args.badgeName} for user ${user.handle}`)
      await db.pool.end()
    },
  })
  .demandCommand(1)
  .parse(process.argv.slice(2))
