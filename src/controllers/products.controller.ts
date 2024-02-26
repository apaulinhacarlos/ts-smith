import { Request, Response } from 'express';
import productsService from '../services/products.service';

const createProduct = async (req: Request, res: Response) => {
  const { name, price, userId } = req.body;

  const newProduct = await productsService.createProduct({ name, price, userId });
  
  return res.status(201).json(newProduct);
};

const listProducts = async (req: Request, res: Response) => {
  const products = await productsService.listProducts();
  
  return res.status(200).json(products);
};

export default {
  createProduct,
  listProducts,
};