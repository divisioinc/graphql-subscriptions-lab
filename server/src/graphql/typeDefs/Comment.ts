import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: ID!
    content: String!
    author: User!
  }

  type CreateCommentPayload {
    comment: Comment!
  }

  type NewCommentPayload {
    post: Post!
    comment: Comment!
  }

  type Query {
    comment(id: ID!): Comment!
    comments: [Comment!]!
  }

  type Mutation {
    createComment(content: String!): Comment
  }

  type Subscription {
    newComment: NewCommentPayload
  }
`;
