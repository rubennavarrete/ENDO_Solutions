import express from 'express';
import cors from 'cors';
import morgan from "morgan";

import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());
const whiteList = [
  "http://localhost:4400",
  "https://localhost:4400",
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