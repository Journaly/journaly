import * as path from 'path'

import { makeSchema, declarativeWrappingPlugin } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'

import CommentTypes from './comment'
import TopicTypes from './topic'
import ImageTypes from './headlineImage'
import InputTypes from './inputTypes'
import PostTypes from './post'
import UserTypes from './user'
import LanguageTypes from './language'
import SocialMediaTypes from './socialMedia'
import ClapTypes from './clap'
import ThanksTypes from './thanks'
import SubscriptionTypes from './subscription'
import NotificationTypes from './notification'

const reflectionRun = !!parseInt(process.env.NEXUS_REFLECTION || '0')

const schemaOpts: Parameters<typeof makeSchema>[0] = {
  sourceTypes: {
    modules: [
      {
        module: '@journaly/j-db-client',
        alias: 'prisma',
      },
    ],
  },
  contextType: {
    module: require.resolve('./context'),
    alias: 'ctx',
    export: 'Context',
  },
  nonNullDefaults: {
    output: true,
    input: true,
  },
  types: [
    ...ImageTypes,
    ...TopicTypes,
    ...InputTypes,
    ...CommentTypes,
    ...PostTypes,
    ...UserTypes,
    ...LanguageTypes,
    ...SocialMediaTypes,
    ...ClapTypes,
    ...ThanksTypes,
    ...SubscriptionTypes,
    ...NotificationTypes,
  ],
  shouldGenerateArtifacts: reflectionRun,
  plugins: [
    nexusPrisma({
      shouldGenerateArtifacts: reflectionRun,
      inputs: {
        prismaClient: '@journaly/j-db-client'
      }
    }),
    declarativeWrappingPlugin(),
  ],
}

if (reflectionRun) {
  schemaOpts.shouldExitAfterGenerateArtifacts = true
  schemaOpts.outputs = {
    typegen: path.join(__dirname, '../node_modules/@types/typegen-nexus/index.d.ts'),
    schema: path.join(__dirname, './api.graphql'),
  }
}

const schema = makeSchema(schemaOpts)
export { schema }
