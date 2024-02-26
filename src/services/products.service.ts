import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';

const createProduct = async (product: ProductInputtableTypes) : Promise<Product> => {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
};

const listProducts = async () : Promise<ProductSequelizeModel[]> => {
  const products = await ProductModel.findAll();
  
  return products;
};

export default {
  createProduct,
  listProducts,
};