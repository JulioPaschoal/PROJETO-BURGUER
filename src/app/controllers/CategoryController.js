import * as Yup from 'yup';
import { v4 } from 'uuid';
import Category from '../models/Category';

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
    const { name } = req.body;
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
