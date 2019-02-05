const {ApolloServer} = require('apollo-server')

require('dotenv').config()

require('./db')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})
