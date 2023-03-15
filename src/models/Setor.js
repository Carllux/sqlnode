import Sequelize, { Model } from 'sequelize';

export default class Setor extends Model {
  static init(sequelize) {
    super.init({
      setor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Campo setor deve conter entre 2 e 50 caracteres',
          },
        },
      },
    }, {
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
      underscored: true,
      sequelize,
    });

    return this;
  }
}
