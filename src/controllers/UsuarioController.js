/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import multer from 'multer';
import Usuario from '../models/Usuario.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, resolve(__dirname, '..', 'public', 'userPhoto'));
  },
  filename: (req, _file, cb) => {
    cb(null, `usuario-${req.params.id}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

class UsuarioController {
  async store(req, res) {
    try {
      console.log(req.body);
      const user = await Usuario.findOne({
        where: {
          usuario: req.body.usuario,
        },
      });
      if (!user) {
        const novoUsuario = await Usuario.create(req.body);
        const {
          id, nome, sobrenome, usuario, setor,
        } = novoUsuario;
        res.json(
          {
            id, nome, sobrenome, usuario, setor,
          },
        );
      } else {
        res.status(400).json(
          {
            errors: `Usuário "${req.body.usuario}" já cadastrado`,
          },
        );
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(
        {
          errors: error.errors?.map((err) => (err.message === err.message.includes('must be unique') ? 'Usuário inválido' : `Usuário "${req.body.usuario}" já cadastrado`)),
        },
      );
    }
  }

  async index(_req, res) {
    try {
      const users = await Usuario.findAll();
      console.log(users);
      return res.json(users);
    } catch (error) {
      return res.status(400).json(
        {
          errors: error.errors?.map((err) => err.message),
        },
      );
    }
  }

  async show(req, res) {
    console.log(req.params, 'Método show');
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) throw Error;

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
      const id = req.params.id * 1;
      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const user = await Usuario.findByPk(id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const updatedData = await
      user.update(
        req.body,
        { where: { id: user.id } },
      );
      return res.json(updatedData);
    } catch (error) {
      console.log(error);
      return res.status(400).json(
        {
          errors: error?.errors.map((err) => (err.message === err.message.includes('must be unique') ? 'Usuário inválido' : `Usuário ${req.body.usuario} já cadastrado`)),
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

      if (user) await user.destroy();
      return res.json(user);
    } catch (error) {
      console.log(error.errors);
      return res.status(400).json(
        {
          errors: [error.message],
        },
      );
    }
  }

  async uploadUserPhoto(req, res) {
    console.log(req.file);
    const id = req.params.id * 1;
    try {
      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado ou não existe'],
        });
      }
      const user = await Usuario.findByPk(id);
      console.log(req.file);
      user.foto = req.file.filename;

      user.save();
      return res.json(user);
    } catch (error) {
      return res.status(400).json(
        {
          errors: [error.message],
        },
      );
    }
  }

  uploadFoto = upload.single('foto');
}

/*
index -> lista todos os registros - get
store/create - cria um novo registro - post
delete - apaga um registro - delete
show - mostra um registro - get
update - atualiza um registro - patch/put
*/
export default new UsuarioController();
