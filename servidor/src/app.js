import express from 'express';
import cors from 'cors';
import morgan from "morgan";

import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());
const whiteList = [
  "http://localhost:4400",
  "http://localhost:4200",
  "http://localhost:4020",
  "https://endo-solution.rubenvn.com",

];

app.use(
  cors({
    credentials: true,
    origin: whiteList,
  })
);

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(indexRoutes);

export default app;