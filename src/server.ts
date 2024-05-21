import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

const bootstrap = async () => {
  server = app.listen(config.port, () => {
    console.log(`Server running on port: ${config.port}`);
  });

  try {
    await mongoose.connect(config.DB_URI as string, {
      dbName: 'InventoryManagement',
    });
    console.log('Database succefully connected.');
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
