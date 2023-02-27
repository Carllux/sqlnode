import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const novoUsuario = await Usuario.create({
      usuario: 'Admin',
      nome: 'SUPORTE',
      sobrenome: '',
      setor: 'TI',
      senha: '123456',
      ativo: 1,
    });
    res.json(novoUsuario);
  }
}

export default new UsuarioController();
