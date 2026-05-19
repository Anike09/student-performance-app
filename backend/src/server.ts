import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection, Connection } from 'typeorm';
import routes from './routes/index';
import { Server } from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// mount API routes before static files to guarantee /api is handled by Express routes
app.use('/api', routes);

// serve minimal frontend for preview (only if directory exists)
const publicPath = path.join(__dirname, '../../frontend/public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get('/', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));
} else {
  // when frontend not present, provide a small health endpoint
  app.get('/', (_req, res) => res.send('Student Performance API is running'));
}

let server: Server | null = null;
let connection: Connection | null = null;
let shuttingDown = false;

function closeServer(serverInstance: Server | null): Promise<void> {
  if (!serverInstance) return Promise.resolve();
  return new Promise((resolve, reject) => {
    serverInstance.close((err?: Error) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function start(): Promise<Server> {
  try {
    connection = await createConnection(); // expects ormconfig or env-based TypeORM config
    console.log('Database connected');

    // Ensure routes are mounted (already mounted above) — keep here in case of re-ordering
    app.use('/api', routes);

    // start HTTP server and await listening or errors
    server = await new Promise<Server>((resolve, reject) => {
      const s = app.listen(PORT, () => {
        console.log(`Server running: http://localhost:${PORT} (frontend preview at /)`);
        resolve(s);
      });
      s.on('error', (err) => reject(err));
    });

    // graceful handlers
    const shutdown = async (exitCode = 0) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log('Shutting down...');
      try {
        await closeServer(server);
        console.log('HTTP server closed');
      } catch (err) {
        console.error('Error closing HTTP server:', err);
      }

      try {
        if (connection && connection.isConnected) {
          await connection.close();
          console.log('Database connection closed');
        }
      } catch (err) {
        console.error('Error closing DB connection:', err);
      } finally {
        // allow logs to flush
        process.exit(exitCode);
      }
    };

    process.on('SIGINT', () => shutdown(0));
    process.on('SIGTERM', () => shutdown(0));
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
      // attempt graceful shutdown
      shutdown(1);
    });
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // attempt graceful shutdown
      shutdown(1);
    });

    return server!;
  } catch (err) {
    console.error('Startup error', err);
    // try to close connection if partially opened
    try {
      if (connection && connection.isConnected) await connection.close();
    } catch (closeErr) {
      console.error('Error closing connection after startup failure', closeErr);
    }
    // rethrow so caller can decide (main runner will exit)
    throw err;
  }
}

if (require.main === module) {
  start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export { app, start };