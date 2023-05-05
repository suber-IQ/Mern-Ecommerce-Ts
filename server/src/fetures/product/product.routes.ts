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
        this.router.get('/product/:id',this.ProductController.getProductDetails);
        this.router.put('/product/review',AuthController.isAuthenticateUser, this.ProductController.createProductReview);
        this.router.route('/product/reviews').get(this.ProductController.getProductReviews).delete(AuthController.isAuthenticateUser,this.ProductController.deleteReview);
        this.somePrivateRoutes();

        return this.router;
    }

    private somePrivateRoutes(): void {
        // 👉 Products Routes Admin
        this.router.get('/admin/products', AuthController.isAuthenticateUser,AuthController.authorizeRoles('admin'),this.ProductController.getAdminProducts)
        this.router.post('/admin/product/new',AuthController.isAuthenticateUser,AuthController.authorizeRoles('admin'),this.ProductController.createProduct);     
        // this.router.route('/admin/product/:id',AuthController.isAuthenticateUser,AuthController.authorizeRoles('admin'),this.ProductController.updateProduct);     
        this.router.route('/admin/product/:id').all(AuthController.isAuthenticateUser,AuthController.authorizeRoles("admin")).put(this.ProductController.updateProduct).delete(this.ProductController.deleteProduct);

    }
    
}

export const productRoutes: ProductRoutes = new ProductRoutes();




