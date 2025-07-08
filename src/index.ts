// src/app.ts
import express, { Request, Response } from "express";
import routes from './routes/endpoints'
import dotenv from 'dotenv';
import { Client } from "pg"; 
    
dotenv.config();
const app = express();

const dbConfig = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
});

const client = new Client(dbConfig);
    
const port = process.env.PORT || 3000; 

app.use('/', routes);

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");

    // Execute SQL queries here

    client.query("SELECT * FROM job_tracking", (err:any, result:any) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("Query result:", result.rows);
      }

      // Close the connection when done
      client
        .end()
        .then(() => {
          console.log("Connection to PostgreSQL closed");
        })
        .catch((err:any) => {
          console.error("Error closing connection", err);
        });
    });
  })
  .catch((err:any) => {
    console.error("Error connecting to PostgreSQL database", err);
  })

  app.listen(3000, () => {console.log(`app listening on http://localhost:3000`)});