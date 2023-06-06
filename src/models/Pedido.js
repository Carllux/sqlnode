import Sequelize, { Model } from 'sequelize';
import Usuario from './Usuario';

export default class Pedido extends Model {
  static init(sequelize) {
    super.init({
      descr: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Campo Nome item deve conter entre 3 e 50 caracteres',
          },
        },
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      ref: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id',
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Status',
          key: 'id',
        },
      },
      fornecedor: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
    }, {
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
      underscored: true,
      sequelize,
      modelName: 'Pedido',
    });

    Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });
    Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });

    return this;
  }
}
