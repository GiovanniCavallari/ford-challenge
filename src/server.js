import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import config from './config/server';
import routes from './routes';

const serverConfig = config[process.env.NODE_ENV];

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(serverConfig.port, () => {
  console.log(`Server running on ${serverConfig.url}:${serverConfig.port}`);
});
