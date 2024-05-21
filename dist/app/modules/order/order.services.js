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
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const fetchOrdersIntoDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let filterObj = {};
    if (email) {
        filterObj = { email };
    }
    const result = yield order_model_1.OrderModel.find(filterObj);
    return result;
});
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findOne({ _id: orderData === null || orderData === void 0 ? void 0 : orderData.productId });
    if (!product) {
        return { error: 'Invalid productId.' };
    }
    // Decrement the quantity and determine the new inStock status
    const quantity = product.inventory.quantity;
    const updateQuantity = quantity - 1;
    const inStock = updateQuantity > 0;
    if (quantity > 0) {
        // Update the product inventory
        yield product_model_1.ProductModel.findOneAndUpdate({ _id: orderData.productId }, {
            $inc: { 'inventory.quantity': -1 },
            $set: { 'inventory.inStock': inStock },
        }, { new: true });
        const result = yield order_model_1.OrderModel.create(orderData);
        return { data: result };
    }
    return { error: 'Insufficient quantity available in inventory' };
});
exports.orderServices = {
    fetchOrdersIntoDB,
    createOrderIntoDB,
};
