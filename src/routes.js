import { Router } from 'express';
import { v4 } from 'uuid';
const routes = new Router();

import User from './app/models/User';

routes.get('/', async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: 'Julio Paschoal',
    email: 'juliocpaschoal.com',
    password_hash: 'sd84d8946wd49',
    admin: true,
  });
  return res.status(201).json(user);
});

export default routes;
