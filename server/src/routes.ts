import { Application } from 'express';
import { userRoutes } from './fetures/auth/auth.routes';
import { productRoutes } from './fetures/product/product.routes';


const BASE_URL = '/api/v1'
export default (app: Application) => {
    const routes = () => {
        app.use(BASE_URL,userRoutes.routes());
        app.use(BASE_URL,productRoutes.routes());
    }
    routes();
}