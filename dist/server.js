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
const app_1 = __importDefault(require("./app/app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Server running on port: ${config_1.default.port}`);
    });
    try {
        yield mongoose_1.default.connect(config_1.default.DB_URI, {
            dbName: 'InventoryManagement',
        });
        console.log('Database succefully connected.');
    }
    catch (error) {
        console.log(error);
    }
});
bootstrap();
