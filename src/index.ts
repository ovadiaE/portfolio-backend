import express, { Request, Response } from "express";
import routes from './routes/endpoints';
import dotenv from 'dotenv';
import cors from 'cors' ;

dotenv.config();

const app = express();

app.use(
    cors({
        origin:'http://localhost:3001', 
        methods: ["GET"],
        allowedHeaders: 'Content-Type,Authorization',
    }),
);

const port = process.env.PORT || 3000; 

app.use('/', routes);

app.listen(3000, () => {console.log(`app listening on http://localhost:${port}`)});