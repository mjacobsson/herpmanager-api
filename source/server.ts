import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import specimens from './routes/specimens';
import breedings from './routes/breeding-events';
import feedings from './routes/feeding-events';
import { connectDB } from './db';

const app: Express = express();

const httpServer = http.createServer(app);

async function main() {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'origin, X-Requested-With,Content-Type,Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
      return res.status(200).json({});
    }
    next();
  });

  app.use('/', specimens);
  app.use('/', breedings);
  app.use('/', feedings);

  app.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
      message: error.message
    });
  });

  await connectDB();

  const PORT: any = process.env.PORT ?? 6060;
  if (!httpServer.listening) {
    httpServer.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`)
    );
  }
}

main();

export { app };
