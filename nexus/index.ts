import * as path from 'path'

import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'

import CommentTypes from './comment'
import TopicTypes from './topic'
import ImageTypes from './image'
import InputTypes from './inputTypes'
import PostTypes from './post'
import UserTypes from './user'
import LanguageTypes from './language'
import LikeTypes from './like'
import ThanksTypes from './thanks'
import MiscTypes from './graphql'

const reflectionRun = !!parseInt(process.env.NEXUS_REFLECTION || '0')

const schemaOpts: any = {
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'ContextModule'
      }
    ],
    contextType: 'ContextModule.Context'
  },
  types: [
    ...ImageTypes,
    ...TopicTypes,
    ...InputTypes,
    ...CommentTypes,
    ...PostTypes,
    ...UserTypes,
    ...LanguageTypes,
    ...LikeTypes,
    ...ThanksTypes,
    ...MiscTypes,
  ],
  plugins: [nexusPrisma()]
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
