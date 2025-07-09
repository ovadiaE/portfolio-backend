// src/app.ts
import express, { Request, Response } from "express";
import routes from './routes/endpoints';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
    
const port = process.env.PORT || 3000; 

app.use('/', routes);

app.listen(3000, () => {console.log(`app listening on http://localhost:3000`)});