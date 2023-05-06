import {Router }from 'express';
import AuthController from '../../shared/middleware/auth';
import { PaymentController } from './payment.controllers';


class PaymentRoutes {
    private router: Router;
    private PaymentController = new PaymentController();

    constructor(){
        this.router = Router();
    }


    public routes(): Router{
        this.somePrivateRoutes();
      return this.router;
    }

    private somePrivateRoutes(): void {
      this.router.post('/payment/process',AuthController.isAuthenticateUser,this.PaymentController.processPayment);
      this.router.get('/stripeapikey',AuthController.isAuthenticateUser,this.PaymentController.sendStripeApiKey);
    }
}

export const paymentRoutes: PaymentRoutes = new PaymentRoutes();
