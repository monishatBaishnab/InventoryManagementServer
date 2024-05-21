import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";

const {createNewProductIntoDB} = productServices;

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData = req.body;
        const result = await createNewProductIntoDB(productData);

        res.send({
            "success": true,
            "message": "Products created successfully!",
            "data": result
        })

    } catch (error) {
        next(error);
    }

}

export const productController = {
    createProduct
}