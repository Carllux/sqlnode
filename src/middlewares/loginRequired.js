import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);

  if (!authorization) {
    res.status(401).json({
      errors: ['É necessário estar logado'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, usuario } = dados;

    const user = await Usuario.findOne({
      where: {
        id,
        usuario,
        ativo: 1,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido ou desativado.'],
      });
    }

    req.userId = id;
    req.user = usuario;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
