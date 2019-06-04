const { gql } = require('apollo-server')

module.exports = gql`
  scalar JSON

  type User {
    email: String!
    id: ID!
    gems(tagged: String): [Gem]!
    folders: [Folder]!
    notes: [Note]!
  }

  type Note {
    id: ID!
    title: String!
    content: JSON!
    owner: User!
  }

  type Folder {
    id: ID!
    title: String!
    owner: User!
  }

  type Gem {
    id: ID!
    displayUrl: String!
    href: String!
    title: String!
    folderId: ID
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

  type Portal {
    href: String!
    code: String!
    id: ID!
    owner: User!
  }

  type Query {
    about: String!

    allUsers: [User]!
    viewer: User
    user(id: ID, email: String): User
    note(id: ID!): Note
    checkLogin(id: ID!): LoginRequest
    portal(code: String!): Portal
  }

  type Mutation {
    createNote: Note!
    deleteNote(id: ID!): Note
    updateNote(id: ID!, title: String!, content: JSON!): Note

    createFolder(title: String!): Folder!
    deleteFolder(id: ID!): Folder!

    login(email: String!): LoginRequest
    verifyLogin(token: String!): LoginRequest
    createPortal(code: String!, href: String!): Portal!

    createGem(
      url: String!
      tags: [String]
      favorite: Boolean
      folderId: ID
    ): Gem!
    deleteGem(id: ID!): Gem
    undoDeleteGem(id: ID!): Gem
    toggleFavoriteGem(id: ID!): Gem!
    moveGem(id: ID!, folderId: ID): Gem!
  }
`
