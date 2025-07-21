import express, { Request, Response } from "express";
import routes from './routes/endpoints';
import dotenv from 'dotenv';
import cors from 'cors' ;

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3001', 'https://ovi-landing-page.netlify.app/'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const port = process.env.PORT || 3000; 

app.use('/', routes);

app.listen(3000, () => {console.log(`app listening on http://localhost:${port}`)});