import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'


/*
import './graphql'
import './post'
import './user'
import './language'
import './image'
import './comment'
import './like'
import './topic'
import './thanks'
*/

import TopicTypes from './topic'
import ImageTypes from './image'
import InputTypes from './inputTypes'

const schema = makeSchema({
  typegenAutoConfig: {
    sources: [
      /*
      {
        source: require.resolve('.prisma/client/index.d.ts'),
        alias: "prisma",
      },
      */
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
  ],
  plugins: [nexusPrisma()]
})

export { schema }
