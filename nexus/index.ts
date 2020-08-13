import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(prisma())

import './graphql'
import './post'
import './user'
import './language'
import './image'
import './comment'
