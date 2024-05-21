import Joi from 'joi';

const variantsValidationSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantsValidationSchema).required(),
  inventory: inventoryValidationSchema.required(),
});

export { productValidationSchema };
