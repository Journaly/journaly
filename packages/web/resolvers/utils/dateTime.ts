import { GraphQLDateTime } from 'graphql-iso-date'
import { asNexusMethod } from 'nexus'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')
