import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import productRouter from "./modules/product/product.route";
const app = express();

app.use(express.json());
app.use(cors());

//use product routes
app.use('/api', productRouter);

app.use('*', (req: Request, res: Response) => {
    res.send({
        success: false,
        message: 'Route Not Found.'
    })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).send({
            success: false,
            message: 'Somthing want wrong.'
        })
    }
})

export default app;