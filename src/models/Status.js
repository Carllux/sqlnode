import Sequelize, { Model } from 'sequelize';
import Pedido from './Pedido';

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
      modelName: 'Status',
    });
    Status.hasOne(Pedido, { foreignKey: 'id' });
    Pedido.belongsTo(Status, { foreignKey: 'id' });
    return this;
  }
}
