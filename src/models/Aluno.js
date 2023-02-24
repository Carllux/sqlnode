import Sequelize, { Model } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      usuario: {
        type: Sequelize.STRING
      },
      nome: Sequelize.STRING,
      sobrenome: Sequelize.STRING,
      setor: Sequelize.STRING,
      senha: Sequelize.STRING,
      ativo: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  },
}
