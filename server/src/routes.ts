import { Application } from 'express';
import { userRoutes } from './fetures/auth/auth.routes';


const BASE_URL = '/api/v1'
export default (app: Application) => {
    const routes = () => {
        app.use(BASE_URL,userRoutes.routes());
    }
    routes();
}