import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createNewProductIntoDB = async (productData: Product) => {

    const result = await ProductModel.create(productData);
    return result;
    
}

export const productServices = {
    createNewProductIntoDB
}