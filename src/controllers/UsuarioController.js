import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      console.log(req.body);
      res.json(novoUsuario);
    } catch (error) {
      res.status(400).json(
        {
          errors: error.errors.map((err) => (err.message === 'UQ__usuarios__9AFF8FC688A1A3FE must be unique' ? 'Usuário já cadastrado' : err.message)),
        },
      );
    }
  }

  async index(_req, res) {
    try {
      const users = await Usuario.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json(
        { errors: error.errors.map((err) => err.message) },
      );
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      return res.json(usuario);
    } catch (error) {
      return res.status(404).json({
        message: 'ID não encontrado',
        errors: [error.message],
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id * 1) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const user = await Usuario.findByPk(req.params.id * 1);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const updatedData = await user.update(req.body);

      return res.json(updatedData);
    } catch (error) {
      console.log(error.errors);
      return res.status(400).json(
        {
          errors: error.errors.map((err) => (err.message === 'UQ__usuarios__9AFF8FC688A1A3FE must be unique' ? 'Usuário já cadastrado' : err.message)),
        },
      );
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id * 1) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const user = await Usuario.findByPk(req.params.id * 1);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (error) {
      console.log(error.errors);
      return res.status(400).json(
        {
          errors: error.errors.map((err) => (err.message === 'UQ__usuarios__9AFF8FC688A1A3FE must be unique' ? 'Usuário já cadastrado' : err.message)),
        },
      );
    }
  }
}

/*
index -> lista todos os registros - get
store/create - cria um novo registro - post
delete - apaga um registro - delete
show - mostra um registro - get
update - atualiza um registro - patch/put
*/
export default new UsuarioController();
