import express, { Application, Request, Response,json} from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import path from 'path';
import cors from 'cors';
import HTTP_STATUS from 'http-status-codes';
import bodyParser from 'body-parser'
import applicationRoutes from './routes';
import { config } from './config/config';
import errorMiddleware from './shared/middleware/error'
import cookieParser from 'cookie-parser';


const SERVER_PORT = config.PORT;

export class EcommerceServer{
    private app: Application;

    constructor(app: Application){
        this.app = app;
    }

    public start(): void{
        this.securityMiddleware(this.app);
        this.standarMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorMiddleware(this.app);
        this.startServer(this.app);
    }
 
    private securityMiddleware(app: Application): void{
        app.use(cors({
            origin: config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: HTTP_STATUS.OK,
            methods: ['GET','POST','PUT','DELETE','OPTIONS']
        }));
        app.use(cookieParser());
    }

    private standarMiddleware(app: Application): void{
        app.use(json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(fileUpload());
        app.use(express.static(path.join(__dirname,'../client/build')));
    }
    private routeMiddleware(app: Application): void{
        applicationRoutes(app);
        app.get("*",(req:Request,res) => {
            res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
        });
    }
    private globalErrorMiddleware(app: Application): void{
        app.all('*',(req:Request,res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({
               message: `${req.originalUrl} not found`
            });
         });
       app.use(errorMiddleware);
    }
    private async startServer(app: Application): Promise<void>{
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
          } catch (error) {
           console.log(error);
           
          }
    }

    private startHttpServer(httpServer: http.Server): void{
        console.log(`Server had Started with process ${process.pid}`);
        httpServer.listen(SERVER_PORT,() => {
            console.log(`Server running on port ${SERVER_PORT}`);
            
        })
    }

 
}