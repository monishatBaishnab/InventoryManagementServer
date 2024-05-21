import { NextFunction, Request, Response } from 'express';
import { productServices } from './product.service';
import { productValidationSchema } from './product.validation';

const {
  createNewProductIntoDB,
  fetchProductsIntoDB,
  fetchProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
} = productServices;

// Controller method to fetch all products
const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchTerm } = req.query || {};

    // Constructing success message based on searchTerm existence
    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Products fetched successfully!';

    const result = await fetchProductsIntoDB(searchTerm);

    res.send({
      success: true,
      message: message.replace(/"/g, ''),
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller method to fetch one products
const fetchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req?.params?.productId;
    const result = await fetchProductIntoDB(productId);
    res.send({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller method to create one new products
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productData = req.body;

    // Validating product data against schema
    const { error, value: validatedProductData } =
      productValidationSchema.validate(productData);

    // If validation fails, sending response with error details
    if (error) {
      return res.send({
        success: false,
        message: 'Validation error occurred while processing the request.',
        error: error.details,
      });
    }

    const result = await createNewProductIntoDB(validatedProductData);

    res.send({
      success: true,
      message: 'Products created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller method to update an existing product
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productData = req.body;
    const productId = req.params.productId;

    // Validating product data against schema
    const { error, value: validatedProductData } =
      productValidationSchema.validate(productData);

    // If validation fails, sending response with error details
    if (error) {
      return res.send({
        success: false,
        message: 'Validation error occurred while processing the request.',
        error: error.details,
      });
    }

    const result = await updateProductIntoDB(productId, validatedProductData);

    res.send({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller method to delete a product
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.productId;
    await deleteProductIntoDB(productId);

    res.send({
      success: true,
      message: 'Products deleted successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Exporting product controller methods
export const productController = {
  createProduct,
  fetchProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
};
