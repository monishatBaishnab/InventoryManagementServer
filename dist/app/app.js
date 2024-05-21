"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//use product routes
app.use('/api', product_route_1.default);
app.use('*', (req, res) => {
    res.send({
        success: false,
        message: 'Route Not Found.'
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).send({
            success: false,
            message: 'Somthing want wrong.'
        });
    }
});
exports.default = app;
