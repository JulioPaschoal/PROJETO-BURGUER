import Order from '../schemas/Order';
import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';

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
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.path,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProduct,
    };
    return res.status(201).json(order);
  }
}

export default new OrderController();
