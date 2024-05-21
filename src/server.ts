import { Server } from "http";
import app from "./app/app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

const bootstrap = async () => {
    try {
        await mongoose.connect(config.DB_URI as string, {dbName: 'InventoryManagement'});
        console.log('Database succefully connected.');

        server = app.listen(config.port, () => {
            console.log(`Server running on port: ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrap();