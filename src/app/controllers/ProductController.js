import * as Yup from 'yup';
import { v4 } from 'uuid';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório!'),
      price: Yup.number().required('O preco é obrigatório!'),
      category: Yup.string().required('A categoria é obrigatória!'),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
    const { filename: path } = req.file;
    const { name, price, category } = req.body;
    const product = await Product.create({
      id: v4(),
      name,
      price,
      category,
      path,
    });

    return res.status(201).json(product);
  }
  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
}

export default new ProductController();
