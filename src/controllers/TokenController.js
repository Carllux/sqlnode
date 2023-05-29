import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

class TokenController {
  async store(req, res) {
    try {
      const { usuario = '', senha = '' } = req.body;
      // console.log(usuario, senha);
      const user = await Usuario.findOne({ where: { usuario } });
      const validPass = (await user?.validaSenha(senha));

      // Código a ser refatorado
      if (!user && !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      if (!user && senha) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (user && (!validPass || !senha)) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, usuario }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      return res.status(400).json(
        {
          errors: error.errors?.map((err) => (err.message)),
        },
      );
    }
  }
}

export default new TokenController();
