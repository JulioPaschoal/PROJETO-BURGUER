import * as Yup from 'yup';
import { v4 } from 'uuid';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório!'),
      price: Yup.number().required('O preco é obrigatório!'),
      category: Yup.string().required('A categoria é obrigatória!'),
      //path: Yup.string().required('O path é obrigatório!'),
    });
    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(201).json({ message: 'ok' });
  }
}

export default new ProductController();
