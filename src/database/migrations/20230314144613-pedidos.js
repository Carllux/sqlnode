/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('pedidos', {
      ped_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_item: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      comentario: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      ref: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      // usuario: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'usuarios',
      //     key: 'user_id',
      //   },
      // },
      // setor: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'setores',
      //     key: 'setor_id',
      //   },
      // },
      // status: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   defaultValue: 1,
      //   references: {
      //     model: 'status',
      //     key: 'status_id',
      //   },
      // },
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pedidos');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
