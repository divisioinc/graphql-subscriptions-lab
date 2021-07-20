import { gql } from "apollo-server-express";

export default gql`
  directive @auth on OBJECT | FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    user(id: ID!): User! @auth
    users: [User!]! @auth
    authenticateUser(email: String!, password: String!): AuthPayload!
  }

  type Mutation {
    createUser(email: String!, password: String!, name: String!): User
  }
`;
