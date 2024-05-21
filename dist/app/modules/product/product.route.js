"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
const { createProduct, fetchProducts, fetchProduct, updateProduct, deleteProduct } = product_controller_1.productController;
productRouter.get('/products', fetchProducts);
productRouter.get('/products/:productId', fetchProduct);
productRouter.post('/products', createProduct);
productRouter.put('/products/:productId', updateProduct);
productRouter.delete('/products/:productId', deleteProduct);
exports.default = productRouter;
