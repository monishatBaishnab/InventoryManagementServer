import express from 'express';
import { productController } from '../modules/product/product.controller';

const productRouter = express.Router();

productRouter.get('/products', productController.createProduct);

export default productRouter;