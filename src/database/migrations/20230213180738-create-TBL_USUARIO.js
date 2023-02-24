/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('USUARIOS', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      setor: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('USUARIOS');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
