import db from './db/client.js';
import productsRouter from './api/products.js';
import ordersRouter from "./api/orders.js";
import usersRouter from "./api/users.js";
import reviewsRouter from './api/reviews.js';
import cors from 'cors';
import express from 'express';
const app = express();
export default app;

await db.connect();

app.use(express.json());
app.use(cors());
app.use(( req, res, next ) => {
    console.log(req.method, req.originalUrl);
    next();
})

app.use("/api/orders", ordersRouter); 
app.use("/api/users", usersRouter); 
app.use('/api/products', productsRouter);
app.use("/api/reviews", reviewsRouter);

app.use(( err, req, res, next ) => {
    console.error(err);
    res.status(500).send('Internal server error.')
})

