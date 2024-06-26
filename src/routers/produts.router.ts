import { Router } from 'express';
import productsController from '../controllers/products.controller';

const router = Router();

router.post('/', productsController.createProduct);

router.get('/', productsController.listProducts);

export default router;