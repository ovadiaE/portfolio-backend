import express from "express";
import routes from './routes/endpoints';
import dotenv from 'dotenv';
import cors from 'cors' ;

dotenv.config();

const app = express();

app.use(
  cors({
    origin:'http://localhost:3000', 
    methods: ["GET"],
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

console.log('server starting')

const port = process.env.PORT || 3000; 

app.use('/', routes);

app.listen(3000, () => {console.log(`app listening on http://localhost:${port}`)});