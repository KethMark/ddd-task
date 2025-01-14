import { ApolloServer } from 'apollo-server'
import { schema } from '../application/graphql/schema'
import { context } from '../application/graphql/context'

export const server = new ApolloServer({ 
  schema,
  context
})