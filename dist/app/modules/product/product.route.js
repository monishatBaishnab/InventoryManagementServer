'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const product_controller_1 = require('./product.controller');
const productRouter = express_1.default.Router();
// Destructuring controller methods from product controller
const {
  createProduct,
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
} = product_controller_1.productController;
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
exports.default = productRouter;
