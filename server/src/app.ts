
import express, { Express } from 'express';
import { EcommerceServer } from './serverSetup';
import { config } from './config/config';
import databaseSetup from './config/databaseSetup';

class Application{
  public server: EcommerceServer;

  public async initialize(): Promise<void>{
    this.loadConfig();
    await databaseSetup();
    const app: Express = express();
    this.server = new EcommerceServer(app);
    await this.server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryFunc();
  }
 
}

const application: Application = new Application();


process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

application.initialize();

