import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { dbConfig, middlewaresConfig } from './config'
import models from './models'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

(async function () {
  dbConfig()
  const app = express()
  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const server = new ApolloServer({
    schema,
    context: {
      models
    },
    debug: true
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath}
  );
  

  await server.start()
  server.applyMiddleware({ app })

  const PORT = process.env.PORT
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`)
  })
})()
