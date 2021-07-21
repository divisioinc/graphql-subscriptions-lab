import { gql } from "apollo-server-express";

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment]
  }

  type CreatePostPayload {
    post: Post
  }

  type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
  }

  type Subscription {
    postCreated: Post
  }
`;

/**
 * The postCreated field will update its value whenever a new Post is created on the backend, thus pushing the Post to subscribing clients.
 * 
 * Clients can subscribe to the postCreated field with a GraphQL string like this:
 * 
 * subscription PostFeed {
      postCreated {
        id
        title
        content
        comments
      }
    }
 * 
 */
