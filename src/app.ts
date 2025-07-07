    // src/app.ts
    import express, { Request, Response } from "express";

    // import routes from './routes/endpoints'
   
    const app = express();
    // const port = process.env.PORT || 3000; 

    // app.use('/', routes);
    app.get('/', (req, res) => {res.send('got em')});

    app.listen(3000, () => {
      console.log(`Server running on http://localhost:`);
    });