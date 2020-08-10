const { ApolloServer } = require('apollo-server')
import 'dotenv/config'
const { schema } = require('./schema')
const { createContext } = require('./context')

const PORT = process.env.PORT || 4000

export const server = new ApolloServer({
  schema: schema,
  context: createContext,
  playground: true,
  introspection: true,

  //  tracing: isDev(),
  // introspection: true,
  // debug: isDev(),
  // cors: true,
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
