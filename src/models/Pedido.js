import Sequelize, { Model } from 'sequelize';

export default class Usuario extends Model {
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
      setor: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 50],
            msg: 'Campo setor deve conter entre 2 e 50 caracteres',
          },
        },
      },
      grupo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
