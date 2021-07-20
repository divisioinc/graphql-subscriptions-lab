import { Sequelize } from "sequelize";

import User from "./models/User";
import config from "../config";

const db = new Sequelize(`${config.db.uri}`, {
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
});

const UserModel = User(db);

const syncDatabase = () => {
  db.sync()
    .then(() => console.log("Connected to the database and synced tables"))
    .catch((error) =>
      console.error("Unable to connect and sync to the database", error)
    );
};

export { syncDatabase, UserModel };
