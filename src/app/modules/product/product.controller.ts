import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";

const { createNewProductIntoDB, fetchProductsIntoDB, fetchProductIntoDB, updateProductIntoDB, deleteProductIntoDB } = productServices;

const fetchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fetchProductsIntoDB();
        res.send({
            "success": true,
            "message": "Products fetched successfully!",
            "data": result
        })
    } catch (error) {
        next(error);
    }
}

const fetchProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req?.params?.productId;
        const result = await fetchProductIntoDB(productId);
        res.send({
            "success": true,
            "message": "Product fetched successfully!",
            "data": result
        })
    } catch (error) {
        next(error);
    }
}

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

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productData = req.body;
        const productId = req.params.productId;
        const result = await updateProductIntoDB(productId, productData);

        res.send({
            "success": true,
            "message": "Products updated successfully!",
            "data": result
        })

    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.productId;
        await deleteProductIntoDB(productId);

        res.send({
            "success": true,
            "message": "Products deleted successfully!",
            "data": null
        })

    } catch (error) {
        next(error);
    }
}

export const productController = {
    createProduct,
    fetchProducts,
    fetchProduct,
    updateProduct,
    deleteProduct
}