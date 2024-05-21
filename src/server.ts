import { Server } from "http";
import app from "./app/app";
import config from "./config";

let server: Server;

const bootstrap = async() => {
    server = app.listen(config.port, () => {
        console.log(`Server running on port: ${config.port}`);
    });
}

bootstrap();