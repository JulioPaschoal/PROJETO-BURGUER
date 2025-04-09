import jwt from 'jsonwebtoken';
import 'dotenv/config';

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: 'Você precisa estar logado!' });
  }
  const [_, token] = authToken.split(' ');
  try {
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        throw new Error();
      }
      req.userId = decoded.id;
      req.userName = decoded.name;
      return next();
    });
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido!' });
  }
}

export default authMiddleware;
