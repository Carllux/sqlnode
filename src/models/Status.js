import Sequelize, { Model } from 'sequelize';

export default class Status extends Model {
  static init(sequelize) {
    super.init({
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
        validate: {
          notNull: {
            msg: 'Campo descrição não pode ficar vazio',
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
