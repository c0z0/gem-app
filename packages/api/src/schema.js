const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    email: String!
    id: ID!
    gems(tagged: String): [Gem]!
  }

  type Gem {
    id: ID!
    displayUrl: String!
    href: String!
    title: String
    tags: [String]!
    owner: User!
    favorite: Boolean!
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
    createGem(url: String!, tags: [String], favorite: Boolean): Gem!
    deleteGem(id: ID!): Gem!
    toggleFavoriteGem(id: ID!): Gem!
  }
`
