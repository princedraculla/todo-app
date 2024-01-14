"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todos, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      constraint: true,
      modelName: "User",
      underscored: false,
      timeStamp: false,
    }
  );
  return User;
};
