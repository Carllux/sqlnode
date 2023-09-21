/* eslint-disable import/no-import-module-exports */
import Sequelize from 'sequelize';
import dbConfig from '../config/database.js';
import Usuario from '../models/Usuario.js';
import Pedido from '../models/Pedido.js';
import Status from '../models/Status.js';

const models = [Usuario, Pedido, Status];
const connection = new Sequelize(dbConfig);

connection.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados', err);
  });

models.forEach((model) => model.init(connection));

export default connection;
