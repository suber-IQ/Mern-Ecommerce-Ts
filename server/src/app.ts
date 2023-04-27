import express, { Express } from 'express';
import { EcommerceServer } from './serverSetup';
import { config } from './config/config';
import databaseSetup from './config/databaseSetup';

class Application{
  public initialize(): void{
    this.loadConfig();
    databaseSetup();
    const app: Express = express();
    const server: EcommerceServer = new EcommerceServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryFunc();
  }
 
}

const application: Application = new Application();
application.initialize();