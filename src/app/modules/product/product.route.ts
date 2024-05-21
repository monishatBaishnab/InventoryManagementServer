import express from 'express';
import { productController } from './product.controller';

const productRouter = express.Router();

// Destructuring controller methods from product controller
const {
  createProduct,
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
} = productController;

//Route to fetch all products
productRouter.get('/products', fetchProducts);

//Route to fetch single product by productId
productRouter.get('/products/:productId', fetchProduct);

//Route to create new product
productRouter.post('/products', createProduct);

//Route to update exist product
productRouter.put('/products/:productId', updateProduct);

//Route to delete product
productRouter.delete('/products/:productId', deleteProduct);

// Exporting the productRouter instance
export default productRouter;
