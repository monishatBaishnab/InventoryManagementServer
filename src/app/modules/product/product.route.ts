import express from 'express';
import { productController } from './product.controller';

const productRouter = express.Router();
const {createProduct} = productController;

productRouter.post('/products', createProduct);

export default productRouter;