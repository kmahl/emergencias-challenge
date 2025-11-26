import winston from 'winston';

class Logger {
  private static instance: Logger;
  private winstonLogger: winston.Logger;

  private constructor() {
    this.winstonLogger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return stack
            ? `[${timestamp}] [${level.toUpperCase()}] ${message}\n${stack}`
            : `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string, meta?: unknown): void {
    this.winstonLogger.info(message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.winstonLogger.warn(message, meta);
  }

  error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      this.winstonLogger.error(message, { error: error.message, stack: error.stack });
    } else {
      this.winstonLogger.error(message, { error });
    }
  }
}

export const logger = Logger.getInstance();
