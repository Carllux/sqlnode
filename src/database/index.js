/* eslint-disable import/no-import-module-exports */
import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Usuario from '../models/Usuario';

const models = [Usuario];

// const Sequelize = require('sequelize');
// const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));

// console.log('TOMA');

// console.error(dbConfig);

module.exports = connection;
