/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      // setor_id: {
      //   // 1:1 association
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: 'setores',
      //     key: 'id',
      //   },
      // },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // grupo_id: {
      //   // 1:1 association
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: 'grupos',
      //     key: 'id',
      //   },
      // },
      // perfil_id: {
      //   // 1:1 association
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: 'perfis_de_acesso',
      //     key: 'id',
      //   },
      // },
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
  },
};
