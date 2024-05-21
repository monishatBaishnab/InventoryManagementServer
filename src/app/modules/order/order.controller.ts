import { NextFunction, Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.services';

const { createOrderIntoDB, fetchOrdersIntoDB } = orderServices;

const fetchOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.query.email;
    const result = await fetchOrdersIntoDB(email as string | undefined);

    res.send({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: validatedOrderData } = orderValidationSchema.validate(
      req?.body,
    );

    if (error) {
      return res.send({
        success: false,
        message: 'Validation error occurred while processing the request.',
        error: error.details,
      });
    }

    const result = await createOrderIntoDB(validatedOrderData);

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
  } catch (error) {
    next(error);
  }
};
export const orderController = {
  fetchOrders,
  createOrder,
};
