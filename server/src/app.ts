
import express, { Express } from 'express';
import { EcommerceServer } from './serverSetup';
import { config } from './config/config';
import databaseSetup from './config/databaseSetup';

class Application{

  public async initialize(){
    this.loadConfig();
    await databaseSetup();
    const app: Express = express();
    const server: EcommerceServer = new EcommerceServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryFunc();
  }

  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      console.log(`There was an uncaught error: ${error}`);
      Application.shutDownProperly(1);
    });

    process.on('unhandleRejection', (reason: Error) => {
      console.log(`Unhandled rejection at promise: ${reason}`);
      Application.shutDownProperly(2);
    });

    process.on('SIGTERM', () => {
      console.log('Caught SIGTERM');
      Application.shutDownProperly(2);
    });

    process.on('SIGINT', () => {
      console.log('Caught SIGINT');
      Application.shutDownProperly(2);
    });

    process.on('exit', () => {
      console.log('Exiting');
    });
  }
  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        console.log('Shutdown complete');
        process.exit(exitCode);
      })
      .catch((error) => {
        console.log(`Error during shutdown: ${error}`);
        process.exit(1);
      });
  }

}

const application: Application = new Application();



application.initialize();

