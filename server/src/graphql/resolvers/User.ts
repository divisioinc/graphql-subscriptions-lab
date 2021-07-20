import { UserInputError } from "apollo-server-express";
import { compare } from "bcrypt";

import { UserModel } from "../../db";
import { generateUserToken } from "../../utils";

export default {
  Query: {
    async user(_, { id }) {
      if (!id) throw new UserInputError("ID is required");

      return await UserModel.findByPk(id);
    },

    async users() {
      return await UserModel.findAll();
    },

    async authenticateUser(_, { email, password }) {
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new UserInputError("Invalid email/password");
      }

      const userPassword = user.getDataValue("password");

      const isValid = await compare(password, userPassword);

      if (!isValid) {
        throw new UserInputError("Invalid email/password");
      }

      const id = user.getDataValue("id");

      const token = await generateUserToken(id);

      return {
        token,
        user,
      };
    },
  },

  Mutation: {
    async createUser(_, { name, email, password }) {
      return await UserModel.create({
        name,
        email,
        password,
      });
    },
  },
};
