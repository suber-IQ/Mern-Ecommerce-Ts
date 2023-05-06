import { Application } from 'express';
import { userRoutes } from './fetures/auth/auth.routes';
import { productRoutes } from './fetures/product/product.routes';
import { orderRoutes } from './fetures/order/order.routes';
import { paymentRoutes } from './fetures/payment/payment.routes';


const BASE_URL = '/api/v1';
export default (app: Application) => {
    const routes = () => {
        app.use(BASE_URL,userRoutes.routes());
        app.use(BASE_URL,productRoutes.routes());
        app.use(BASE_URL,orderRoutes.routes());
        app.use(BASE_URL,paymentRoutes.routes());
    };
    routes();
};
