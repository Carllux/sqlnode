/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('cotacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pedidos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      valor: {
        type: Sequelize.DECIMAL(11, 2),
        allowNull: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
        references: {
          model: 'status',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      link: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      comentario: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      ref: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      foto: {
        type: Sequelize.STRING(250),
        allowNull: true,
        defaultValue: null,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      logging: console.log,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cotacoes');
  },
};
