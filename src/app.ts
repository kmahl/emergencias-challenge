import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares';
import { swaggerSpec } from './config/swagger';
import routes from './routes';

// Configurar morgan para usar winston
const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    // Security
    this.app.use(helmet());
    this.app.use(cors());

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // HTTP request logging con morgan integrado a winston
    if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('dev', { stream: morganStream }));
    } else {
      this.app.use(morgan('combined', { stream: morganStream }));
    }
  }

  private configureRoutes(): void {
    // Swagger documentation
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Health check
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    this.app.use('/api', routes);
  }

  private configureErrorHandling(): void {
    // 404 handler
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found',
      });
    });

    // Global error handler
    this.app.use(errorHandler);
  }

  public getExpressApp(): Application {
    return this.app;
  }
}
