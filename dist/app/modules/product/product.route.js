"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
const { createProduct } = product_controller_1.productController;
productRouter.post('/products', createProduct);
exports.default = productRouter;
