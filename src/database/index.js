const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

// console.log('TOMA');

console.error(dbConfig);

module.exports = connection;
