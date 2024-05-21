"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const { createNewProductIntoDB, fetchProductsIntoDB, fetchProductIntoDB, updateProductIntoDB, deleteProductIntoDB } = product_service_1.productServices;
const fetchProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fetchProductsIntoDB();
        res.send({
            "success": true,
            "message": "Products fetched successfully!",
            "data": result
        });
    }
    catch (error) {
        next(error);
    }
});
const fetchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
        const result = yield fetchProductIntoDB(productId);
        res.send({
            "success": true,
            "message": "Product fetched successfully!",
            "data": result
        });
    }
    catch (error) {
        next(error);
    }
});
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const { error, value: validatedProductData } = product_validation_1.productValidationSchema.validate(productData);
        if (error) {
            return res.send({
                "success": false,
                "message": "Somthing want wrong!",
                "error": error.details
            });
        }
        const result = yield createNewProductIntoDB(validatedProductData);
        res.send({
            "success": true,
            "message": "Products created successfully!",
            "data": result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productId = req.params.productId;
        const { error, value: validatedProductData } = product_validation_1.productValidationSchema.validate(productData);
        if (error) {
            return res.send({
                "success": false,
                "message": "Somthing want wrong!",
                "error": error.details
            });
        }
        const result = yield updateProductIntoDB(productId, validatedProductData);
        res.send({
            "success": true,
            "message": "Products updated successfully!",
            "data": result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield deleteProductIntoDB(productId);
        res.send({
            "success": true,
            "message": "Products deleted successfully!",
            "data": null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    createProduct,
    fetchProducts,
    fetchProduct,
    updateProduct,
    deleteProduct
};
