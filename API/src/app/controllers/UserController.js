import { v4 } from 'uuid';
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  // Store a new user \\
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(5, 'O nome deve conter no mínimo 5 dígitos!')
        .required('Insira um nome completo!'),
      email: Yup.string()
        .email('Insira um e-mail valido!')
        .required('O campo e-mail é obrigatório!'),
      password: Yup.string()
        .min(6, 'A senha deve conter no mínimo 6 dígitos!')
        .required('O campo senha é obrigatória!'),
      admin: Yup.boolean(),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
    const { name, email, password, admin } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: 'O usuário já existe no sistema!' });
    }
    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });
    return res.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
