"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

require("@babel/polyfill");

require("dotenv/config");

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

var _require2 = require('./schema'),
    schema = _require2.schema;

var _require3 = require('./context'),
    createContext = _require3.createContext;

var PORT = process.env.PORT || 4000;
var myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart: function requestDidStart(requestContext) {
    console.log('Request started! Query:\n' + requestContext.request.query);
    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart: function parsingDidStart(requestContext) {
        console.log('Parsing started!');
        return function (err) {
          if (err) {
            console.error(err);
          }
        };
      },
      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart: function validationDidStart(requestContext) {
        console.log('Validation started!');
        return function (errs) {
          if (errs) {
            errs.forEach(function (err) {
              return console.error(err);
            });
          }
        };
      }
    };
  }
};
var server = new ApolloServer({
  schema: schema,
  context: createContext,
  playground: true,
  introspection: true,
  engine: {
    reportSchema: true
  } //plugins: [myPlugin],
  //  tracing: isDev(),
  // introspection: true,
  // debug: isDev(),
  // cors: true,

});
exports.server = server;
server.listen({
  port: PORT
}).then(function (_ref) {
  var url = _ref.url;
  console.log("Server ready at ".concat(url));
});