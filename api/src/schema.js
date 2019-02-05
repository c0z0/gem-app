const {gql} = require('apollo-server')

module.exports = gql`
  type User {
    email: String!
    id: ID!
  }

  type LoginRequest {
    token: String
    id: ID!
    pending: Boolean!
    user: User!
    verificationCode: String!
  }

  type Query {
    allUsers: [User]!
    viewer: User
    user(id: ID, email: String): User
    checkLogin(id: ID!): LoginRequest
  }

  type Mutation {
    login(email: String!): LoginRequest
    verifyLogin(token: String!): LoginRequest
  }
`
