import Order from '../schemas/Order';
import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().required('Id do Produto é obrigatório'),
          quantity: Yup.number('O quantidade deve ser um número').required(
            'Quantidade é obrigatória',
          ),
        }),
      ),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { products } = req.body;
    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: { id: productsIds },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProduct = findProducts.map((product) => {
      const productIndex = products.findIndex((item) => item.id === product.id);
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.path,
        quantity: products[productIndex].quantity,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProduct,
      status: 'Pedido realizado',
    };

    const createOrder = await Order.create(order);
    return res.status(201).json(createOrder);
  }

  async index(req, res) {
    const orders = await Order.find();

    return res.json(orders);
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required('Status é obrigatório'),
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
    const { status } = req.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao atualizar o status' });
    }
    return res.json({ message: 'Status atualizado com sucesso' });
  }
}

export default new OrderController();
