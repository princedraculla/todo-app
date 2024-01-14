'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todos.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Todos.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    freezeTableName:true,
    timestamps: true,
    underscored: true,
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};