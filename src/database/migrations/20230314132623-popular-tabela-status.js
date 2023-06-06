'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const dados = [
      { descricao: 'Novo' },
      { descricao: 'Pendente' },
      { descricao: 'Em cotação' },
      { descricao: 'A aprovar' },
      { descricao: 'Aprovada' },
      { descricao: 'Finalizada' },
      { descricao: 'Cancelada' },
    ];
    await queryInterface.bulkInsert('Status', dados, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Status', null, {});
  },
};
