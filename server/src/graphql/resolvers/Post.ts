import { UserInputError } from "apollo-server-express";

import { PostModel } from "../../db";

export default {
  Query: {
    async post(_, { id }) {
      if (!id) throw new UserInputError("ID is required");

      return await PostModel.findByPk(id);
    },

    async posts() {
      return await PostModel.findAll();
    },
  },

  Mutation: {
    async createPost(_, { title, content }) {
      return await PostModel.create({
        title,
        content,
      });
    },
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },
};
