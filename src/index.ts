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
  app.listen(3000, () => {console.log(`app listening on http://localhost:${port}`)});
}
catch(error) {
  console.log(error);
}