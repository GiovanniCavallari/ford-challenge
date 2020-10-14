import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.APPSETTING_SERVER_PORT, () => {
  console.log(`Server running on ${process.env.APPSETTING_SERVER_URL}:${process.env.APPSETTING_SERVER_PORT}`);
});
