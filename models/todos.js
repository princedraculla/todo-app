'use strict';
import  {
  Model
}  from 'sequelize';
export default (sequelize, DataTypes) => {
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
    id:{type: DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
    },
    userId:{type: DataTypes.INTEGER,
    references:{
      model: 'User',
      key: 'id'
    }
    },
    isDone: {type:DataTypes.BOOLEAN,
    defaultValue:false
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: false,
    modelName: 'Todos',
  });
  return Todos;
};