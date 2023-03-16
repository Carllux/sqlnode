import Sequelize, { Model } from 'sequelize';

export default class Pedido extends Model {
  static init(sequelize) {
    super.init({
      nome_item: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo usuário deve conter entre 3 e 50 caracteres',
          },
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      comentario: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      ref: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notNull: {
            msg: 'Campo referência não deve ficar vazio.',
          },
        },
      },
      usuario: {
        // fk
        type: Sequelize.STRING,
      },
      status: {
        // fk
        type: Sequelize.BOOLEAN,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
