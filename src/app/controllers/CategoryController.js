import * as Yup from 'yup';
import { v4 } from 'uuid';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome da categoria é obrigatório!'),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(401).json({ error: 'Acesso negado!' });
    }

    const { name } = req.body;
    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ error: 'Categoria já existe!' });
    }
    const category = await Category.create({
      id: v4(),
      name,
    });

    return res.status(201).json(category);
  }
  async index(req, res) {
    const category = await Category.findAll();
    return res.json(category);
  }
}

export default new CategoryController();
