import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // comments
  });

  return Post;
};
