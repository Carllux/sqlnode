'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const dados = [
      {
        usuario: 'Admin',
        nome: 'Administrador',
        senha_hash: '$2a$08$KU1IaHyfPrSinK7/eBfe6OTHMr1TwfVBqH3wJSaStsMpcsRc0AG4K',
        ativo: true,
      },
    ];
    await queryInterface.bulkInsert('usuarios', dados, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = { Sequelize };
    await queryInterface.bulkDelete('usuarios', { id: [1] }, {});
  },
};
