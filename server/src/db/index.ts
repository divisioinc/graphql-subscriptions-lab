import { Sequelize } from "sequelize";

import config from "../config";

import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const db = new Sequelize(`${config.db.uri}`, {
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
});

const UserModel = User(db);
const PostModel = Post(db);
const CommentModel = Comment(db);

const syncDatabase = () => {
  db.sync()
    .then(() => console.log("Connected to the database and synced tables"))
    .catch((error) =>
      console.error("Unable to connect and sync to the database", error)
    );
};

export { syncDatabase, UserModel, PostModel, CommentModel };
