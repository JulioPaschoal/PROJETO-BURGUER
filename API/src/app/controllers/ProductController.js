import * as Yup from 'yup';
import { v4 } from 'uuid';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório!'),
      price: Yup.number().required('O preco é obrigatório!'),
      category_id: Yup.string().required('A categoria é obrigatória!'),
      offer: Yup.boolean(),
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
    const { filename: path } = req.file;
    const { name, price, category_id, offer } = req.body;
    const product = await Product.create({
      id: v4(),
      name,
      price,
      category_id,
      path,
      offer,
    });

    return res.status(201).json(product);
  }
  async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(products);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.string(),
      offer: Yup.boolean(),
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
    const { id } = req.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return res.status(400).json({ error: 'Produto nao encontrado!' });
    }

    let path;
    if (req.file) {
      path = req.file.filename;
    }
    const { name, price, category_id, offer } = req.body;
    await Product.update(
      {
        id: v4(),
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    return res.status(200).json({ message: 'Produto atualizado com sucesso' });
  }
}

export default new ProductController();
