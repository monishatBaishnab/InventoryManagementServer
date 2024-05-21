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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const fetchProductsIntoDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let searchObj = {};
    if (searchTerm) {
        searchObj = { $text: { $search: searchTerm } };
    }
    const result = yield product_model_1.ProductModel.find(searchObj);
    return result;
});
const fetchProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(productId);
    const result = yield product_model_1.ProductModel.findOne({ _id: productId });
    return result;
});
const createNewProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const updateProductIntoDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOneAndUpdate({ _id: productId }, { $set: productData }, { new: true });
    return result;
});
const deleteProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: productId });
    return result;
});
exports.productServices = {
    createNewProductIntoDB,
    fetchProductsIntoDB,
    fetchProductIntoDB,
    updateProductIntoDB,
    deleteProductIntoDB
};
