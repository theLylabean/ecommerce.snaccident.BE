import db from './db/client.js';
import productsRouter from './api/products.js';
import express from 'express';
const app = express();
export default app;

await db.connect();

app.use(express.json());
app.use(( req, res, next ) => {
    console.log(req.method, req.originalUrl);
    next();
})

app.use('/products', productsRouter);

app.use(( err, req, res, next ) => {
    console.error(err);
    res.status(500).send('Internal server error.')
})