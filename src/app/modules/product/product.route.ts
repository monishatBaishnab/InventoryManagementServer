import express from 'express';
import { productController } from './product.controller';

const productRouter = express.Router();
const { createProduct, fetchProducts, fetchProduct, updateProduct, deleteProduct } = productController;

productRouter.get('/products', fetchProducts);

productRouter.get('/products/:productId', fetchProduct);

productRouter.post('/products', createProduct);

productRouter.put('/products/:productId', updateProduct);

productRouter.delete('/products/:productId', deleteProduct);

export default productRouter;