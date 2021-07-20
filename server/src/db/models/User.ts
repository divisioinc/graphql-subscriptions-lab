import { hash } from "bcrypt";
import { DataTypes, Sequelize } from "sequelize";
import { UserInputError } from "apollo-server-express";

export default (sequelize: Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.addHook("beforeCreate", async (user) => {
    const exists = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (exists) {
      throw new UserInputError("Email already in use.");
    }

    if (user.password) {
      user.password = await hash(user.password, 8);
    }
  });

  return User;
};
