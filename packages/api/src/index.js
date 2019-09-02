const { ApolloServer } = require('apollo-server')
const Sentry = require('@sentry/node')

require('dotenv').config()
Sentry.init({ dsn: process.env.GEM_SENTRY_DSN })

require('./db')

const production = process.env.NODE_ENV === 'production'

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { getViewer } = require('./utils')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: !production,
  playground: !production,
  formatError: error => {
    Sentry.captureMessage(error.message)
    return error
  },
  context: async ({ req }) => {
    const token = req.headers.authorization

    if (!token) return {}

    return { viewer: await getViewer(token) }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
