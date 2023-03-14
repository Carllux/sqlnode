/* eslint-disable import/no-import-module-exports */
import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Usuario from '../models/Usuario';

const models = [Usuario];
const connection = new Sequelize(dbConfig);

connection.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados', err);
  });

models.forEach((model) => model.init(connection));

module.exports = connection;
