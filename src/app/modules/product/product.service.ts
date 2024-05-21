import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const fetchProductsIntoDB = async () => {
    const result = await ProductModel.find();
    return result;
}

const fetchProductIntoDB = async (productId: string) => {
    console.log(productId);
    const result = await ProductModel.findOne({ _id: productId });
    return result;
}

const createNewProductIntoDB = async (productData: Product) => {
    const result = await ProductModel.create(productData);
    return result;
}

const updateProductIntoDB = async (productId: string, productData: Product) => {
    const result = await ProductModel.findOneAndUpdate({ _id: productId }, { $set: productData }, {new: true});
    return result;
}

const deleteProductIntoDB = async (productId: string) => {
    const result = await ProductModel.deleteOne({ _id: productId });
    return result;
}

export const productServices = {
    createNewProductIntoDB,
    fetchProductsIntoDB,
    fetchProductIntoDB,
    updateProductIntoDB,
    deleteProductIntoDB
}