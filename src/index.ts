import express from "express";
import routes from './routes/endpoints';
import dotenv from 'dotenv';
import cors from 'cors' ;

dotenv.config();

const app = express();

app.use(
  cors({
    origin:'https://ovi-landing-page.netlify.app/', 
    methods: ["GET"],
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

console.log('server starting');

const port = 3000; 

app.use('/', routes);

try {
  app.listen(3000, '0.0.0.0', () => {
    console.log('App listening on http://0.0.0.0:3000');
  });
} catch (error) {
  console.error('Server failed to start:', error);
}
