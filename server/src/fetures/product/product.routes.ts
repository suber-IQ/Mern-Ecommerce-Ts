import express, { Router } from 'express';
import AuthController from '../../shared/middleware/auth';
import { ProductController } from './product.controllers';

class ProductRoutes{
    private router: Router;
    private ProductController = new ProductController();

    constructor(){
        this.router = express.Router();
    }

    public routes(): Router{

        this.router.get('/products',this.ProductController.getAllProducts)
       
        this.somePrivateRoutes();

        return this.router;
    }

    private somePrivateRoutes(): void {

        // 👉 Products Routes Admin
        this.router.post('/admin/product/new',AuthController.isAuthenticateUser,AuthController.authorizeRoles('admin'),this.ProductController.createProduct);     
    }
    
}

export const productRoutes: ProductRoutes = new ProductRoutes();




