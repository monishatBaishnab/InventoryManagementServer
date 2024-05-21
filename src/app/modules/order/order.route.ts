import express from 'express';
import { orderController } from './order.controller';

const orderRouter = express.Router();
const { fetchOrders, createOrder } = orderController;

orderRouter.get('/orders', fetchOrders);

orderRouter.post('/orders', createOrder);

export default orderRouter;
