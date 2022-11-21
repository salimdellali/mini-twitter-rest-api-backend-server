import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Database } from './config/database.config';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 2000;
const API_VERSION = '/api/v1';

Database.connect(process.env.MONGODB_URL!);
app.use(cors());
app.use(express.json());

// healthcheck route
app.get('/ping', (req: Request, res: Response) => res.send('pong'));

app.listen(PORT, () => {
  console.log('Web server running on port: ' + PORT);
});
