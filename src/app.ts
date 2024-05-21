import express, { Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/product/product.route';
import orderRouter from './app/modules/order/order.route';
const app = express();

app.use(express.json());
app.use(cors());

// Route for checking the health of the service
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('Service is up and running!');
});

// Mounting product routes
app.use('/api', productRouter);

//Mounting order routes
app.use('/api', orderRouter);

// Middleware to handle requests to unknown routes
app.use('*', (req: Request, res: Response) => {
  res.send({
    success: false,
    message: 'Route Not Found.',
  });
});

// Error handling middleware to catch and handle errors
app.use((error: any, req: Request, res: Response) => {
  if (error) {
    res.status(400).send({
      success: false,
      message: 'Somthing want wrong.',
    });
  }
});

export default app;
