import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";
import { productValidationSchema } from "./product.validation";

const { createNewProductIntoDB, fetchProductsIntoDB, fetchProductIntoDB, updateProductIntoDB, deleteProductIntoDB } = productServices;

const fetchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchTerm } = req.query || {};
        console.log(searchTerm);
        const message = searchTerm ?
            `Products matching search term '${searchTerm}' fetched successfully!`
            : "Products fetched successfully!";

        const result = await fetchProductsIntoDB(searchTerm);

        res.send({
            "success": true,
            "message": message.replace(/"/g, ""),
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
        const { error, value: validatedProductData } = productValidationSchema.validate(productData)

        if (error) {
            return res.send({
                "success": false,
                "message": "Somthing want wrong!",
                "error": error.details
            })
        }

        const result = await createNewProductIntoDB(validatedProductData);

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

        const { error, value: validatedProductData } = productValidationSchema.validate(productData);

        if (error) {
            return res.send({
                "success": false,
                "message": "Somthing want wrong!",
                "error": error.details
            })
        }

        const result = await updateProductIntoDB(productId, validatedProductData);

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