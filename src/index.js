import '@babel/polyfill'
const { ApolloServer } = require('apollo-server')
import 'dotenv/config'
const { schema } = require('./schema')
const { createContext } = require('./context')

const PORT = process.env.PORT || 4000

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log('Request started! Query:\n' + requestContext.request.query)

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext) {
        console.log('Parsing started!')
        return (err) => {
          if (err) {
            console.error(err)
          }
        }
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext) {
        console.log('Validation started!')
        return (errs) => {
          if (errs) {
            errs.forEach((err) => console.error(err))
          }
        }
      },
    }
  },
}

export const server = new ApolloServer({
  schema: schema,
  context: createContext,
  playground: true,
  introspection: true,
  engine: {
    reportSchema: true,
  },
  //plugins: [myPlugin],
  //  tracing: isDev(),
  // introspection: true,
  // debug: isDev(),
  // cors: true,
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
