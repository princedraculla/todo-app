 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// const sequelize = new Sequelize("postgres://torkash:torkash1234@localhost:5432/",config)

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// console.log(db);
// module.exports = {
//   sequelize,
//   db
// }

import { Sequelize } from "sequelize";
import databaseConfig from "../config/config.js";
import  User from '../models/user.js'
import  Todos from '../models/todos.js'
const models = [
  User,
  Todos
];
let db = {};
class Models {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.config = databaseConfig[this.env];
    this.db = {
      models: {},
    };
    this.sequelize = null;
    if (this.config.use_env_variable) {
      this.sequelize = new Sequelize(
        process.env[this.config.use_env_variable],
        this.config
      );
    } else {
      this.sequelize = new Sequelize(
        this.config.database,
        this.config.username,
        this.config.password,
        this.config
      );
    }
    this.db.sequelize = this.sequelize;
    this.db.Sequelize = Sequelize;
    this.generateModels();
    this.associations();
  }

  generateModels() {
    for (const model of models) {
      const modelClass = model(this.sequelize, Sequelize.DataTypes);
      this.db[modelClass.name] = modelClass;
    }
  }

  associations() {
    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });
  }
}
const modelObj = new Models();
db = modelObj.db;
export  {db};