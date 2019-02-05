const {ApolloServer} = require('apollo-server')

require('dotenv').config()

require('./db')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {getViewer} = require('./utils')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({req}) => {
    const token = req.headers.authorization

    if (!token) return {}

    return {viewer: await getViewer(token)}
  },
})

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})
