import { Schema, model } from 'mongoose';
import { Order } from './order.interface';

const orderShcema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<Order>('Order', orderShcema);
