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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_services_1 = require("./order.services");
const { createOrderIntoDB, fetchOrdersIntoDB } = order_services_1.orderServices;
const fetchOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield fetchOrdersIntoDB(email);
        res.send({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value: validatedOrderData } = order_validation_1.default.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            return res.send({
                success: false,
                message: 'Validation error occurred while processing the request.',
                error: error.details,
            });
        }
        const result = yield createOrderIntoDB(validatedOrderData);
        if (result.error) {
            return res.send({
                success: true,
                message: result.error,
            });
        }
        res.send({
            success: true,
            message: 'Order created successfully!',
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    fetchOrders,
    createOrder,
};
