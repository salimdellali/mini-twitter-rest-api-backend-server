import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Database } from './config/database.config';
import { UserRouter } from './modules/user';
import { AuthRouter } from './modules/auth';
import { TweetRouter } from './modules/tweet';
import * as dotenv from 'dotenv';
import { errorMiddleware } from './middlewares';
import { authMiddleware } from './middlewares/auth.middleware';
dotenv.config();

export const app: Express = express();

const appConfig: any = {
  MONGODB_URL: process.env.MONGODB_URL!,
  API_VERSION: '/api/v1',
  LISTEN_MSG:
    process.env.NODE_ENV === 'test'
      ? 'Test Web server running on port: '
      : 'Web server running on port: ',
  PORT:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_PORT!
      : process.env.PORT!,
  DB_NAME:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_NAME!
      : process.env.DB_NAME!,
};

Database.connect(appConfig.MONGODB_URL, appConfig.DB_NAME);
app.use(cors());
app.use(express.json());

app.use(appConfig.API_VERSION + '/user', UserRouter);
app.use(appConfig.API_VERSION + '/auth', AuthRouter);
app.use(appConfig.API_VERSION + '/tweet', authMiddleware, TweetRouter);

// healthcheck route
app.get('/ping', (req: Request, res: Response) => res.send('pong'));

// handle errors
app.use(errorMiddleware);

app.listen(appConfig.PORT, () => {
  console.log(appConfig.LISTEN_MSG + appConfig.PORT);
});
