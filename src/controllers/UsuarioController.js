import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      console.log(req.body);
      res.json(novoUsuario);
    } catch (error) {
      res.status(400).json(
        // eslint-disable-next-line eqeqeq
        { errors: error.errors.map((err) => (err.message == 'UQ__usuarios__9AFF8FC688A1A3FE must be unique' ? 'Usuário já cadastrado' : err.message)) },
      );
    }
  }

  async index(req, res) {
    try {
      const users = await Usuario.findAll();
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      // console.log(req.params);
      const id = req.params.id * 1;
      console.log(id);
      const usuario = await Usuario.findByPk(id);
      // console.log(usuario);
      return res.json(usuario);
    } catch (error) {
      return res.status(404).json({
        message: 'ID não encontrado',
        erro: error.message,
      });
    }
  }
}

export default new UsuarioController();
