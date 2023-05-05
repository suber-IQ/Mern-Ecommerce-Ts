import express, { Router } from 'express';
import { OrderController } from "./order.controllers";
import AuthController from '../../shared/middleware/auth';


class OrderRoutes {
    private router: Router;
    private OrderController = new OrderController();

    constructor(){
        this.router = express.Router();
    }


    public routes(): Router{
         this.router.post('order/new',AuthController.isAuthenticateUser, this.OrderController.newOrder)
         this.router.get('/order/:id',AuthController.isAuthenticateUser,this.OrderController.getSingleOrder)
         this.router.get('/order/me', AuthController.isAuthenticateUser, this.OrderController.myOrders)
        this.somePrivateRoutes();
      return this.router;   
    }

    private somePrivateRoutes(): void {

      this.router.get('/admin/orders',AuthController.isAuthenticateUser,AuthController.authorizeRoles("admin"),this.OrderController.getAllOrders)
      this.router.route('/admin/order/:id').all(AuthController.isAuthenticateUser,AuthController.authorizeRoles("admin")).put(this.OrderController.updateOrder).delete(this.OrderController.deleteOrder)
    }
}

export const orderRoutes: OrderRoutes = new OrderRoutes();
