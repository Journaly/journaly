import { use } from 'nexus'
import { dbClient } from '@journaly/j-db-client'

use(dbClient())

import './graphql'
import './post'
import './user'
import './language'
import './image'
import './comment'
import './like'
import './topic'
import './thanks'
