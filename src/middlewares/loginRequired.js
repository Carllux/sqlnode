import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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
    req.userId = id;
    req.user = usuario;
    return next();
  } catch (error) {
    res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
    return;
  }
};
