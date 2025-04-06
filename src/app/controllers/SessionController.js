import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required('O campo senha é obrigatória!'),
    });
    const emailOrPasswordIncorrect = () => {
      return res
        .status(400)
        .json({ error: 'Verifique se o e-mail e senha estão corretos' });
    };
    const isValid = await schema.isValid(req.body);
    if (!isValid) {
      emailOrPasswordIncorrect();
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      emailOrPasswordIncorrect();
    }
    const isSamePassword = await user.comparePassword(password);
    if (!isSamePassword) {
      emailOrPasswordIncorrect();
    }
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign(
        { id: user.id, name: user.name },
        process.env.APP_SECRET,
        {
          expiresIn: process.env.APP_EXPIRES,
        },
      ),
    });
  }
}

export default new SessionController();
