import dotenv from "dotenv"
import express from 'express';
import cors from 'cors';
import routerReviews from './routes/reviews';
import routerAuth from './routes/auth';

import { dbConnection } from './database/config';

//Env
dotenv.config();

//Initialize App
const app = express();

//Use Cors
app.use(cors());

//Initialize server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en ${process.env.PORT}`);
});

//Parse body
app.use(express.json());

//Database connection
dbConnection();

//Routes
app.use("/api/reviews", routerReviews);
app.use("/api/auth", routerAuth);



