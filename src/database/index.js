import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';
import mongoose from 'mongoose';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((models) => models.init(this.connection))
      // AVISANDO QUE O MODEL TEM RELACIONAMENTO \\
      .map(
        (models) =>
          models.associate && models.associate(this.connection.models),
      );
  }
  mongo() {
    this.mogoConnection = mongoose.connect();
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/devburger',
    );
  }
}

export default new Database();
