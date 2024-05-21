import { Product } from './product.interface';
import { ProductModel } from './product.model';

// Function to fetch products from the database based on searchTerm
const fetchProductsIntoDB = async (searchTerm: any) => {
  let searchObj = {};
  if (searchTerm) {
    searchObj = { $text: { $search: searchTerm } };
  }

  const result = await ProductModel.find(searchObj);
  return result;
};

// Function to fetch a single product from the database based on productId
const fetchProductIntoDB = async (productId: string) => {
  console.log(productId);
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

// Function to create a new product in the database
const createNewProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData);
  return result;
};

// Function to update an existing product in the database based on productId
const updateProductIntoDB = async (productId: string, productData: Product) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: productId },
    { $set: productData },
    { new: true },
  );
  return result;
};

// Function to delete a product from the database based on productId
const deleteProductIntoDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

// Exporting all product-related database operations as a module
export const productServices = {
  createNewProductIntoDB,
  fetchProductsIntoDB,
  fetchProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
