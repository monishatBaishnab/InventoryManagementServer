import { ProductModel } from '../product/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const fetchOrdersIntoDB = async (email: string | undefined) => {
  let filterObj = {};
  if (email) {
    filterObj = { email };
  }

  const result = await OrderModel.find(filterObj);
  return result;
};

const createOrderIntoDB = async (orderData: Order) => {
  const product = await ProductModel.findOne({ _id: orderData?.productId });
  if (!product) {
    return { error: 'Invalid productId.' };
  }

  // Decrement the quantity and determine the new inStock status
  const quantity = product.inventory.quantity;
  const updateQuantity = quantity - 1;
  const inStock = updateQuantity > 0;

  if (quantity > 0) {
    // Update the product inventory
    await ProductModel.findOneAndUpdate(
      { _id: orderData.productId },
      {
        $inc: { 'inventory.quantity': -1 },
        $set: { 'inventory.inStock': inStock },
      },
      { new: true },
    );
    const result = await OrderModel.create(orderData);
    return { data: result };
  }

  return { error: 'Insufficient quantity available in inventory' };
};

export const orderServices = {
  fetchOrdersIntoDB,
  createOrderIntoDB,
};
