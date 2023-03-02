import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    try {
      const { usuario = '', senha = '' } = req.body;
      // console.log(usuario, senha);

      if (!usuario || !senha) {
        return res.status(401).json({
          errors: ['Credenciais inválidas'],
        });
      }

      const user = await Usuario.findOne({ where: { usuario } });

      if (!user) {
        return res.status(401).json({
          errors: ['Usuário não existe'],
        });
      }

      if (!(await user.validaSenha(senha))) {
        return res.status(401).json({
          errors: ['Senha inválida'],
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, usuario }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (error) {
      return res.status(400).json(
        {
          errors: error.errors.map((err) => (err.message)),
        },
      );
    }
  }
}

export default new TokenController();
