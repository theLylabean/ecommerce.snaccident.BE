import { createProductReviews, getProductReviewsById, getProducts, getProductsById } from '../db/queries/productqueries.js';
import { verifyToken } from '../middleware.js';
import express from 'express';
const router = express.Router();
export default router;

router.get('/', async( req, res, next ) => { 
    const products = await getProducts();
    res.send(products);
})

router.get('/:id', async( req, res, next ) => {
    const id = parseInt(req.params.id);
    try {
        if(!Number.isInteger(id) && id < 0){
            return res.status(400).send({ error: 'Please send a valid number.' });
        }
        const product = await getProductsById(id);
        if(!product){
            return res.status(404).send({ error: 'User ID not found.' });
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error.' });
    }
})

router.get('/:id/reviews', verifyToken, async( req, res, next ) => {
    const product_id = parseInt(req.params.id);
    try {
        if(!Number.isInteger(product_id) || product_id < 0){
            return res.status(400).send({ error: 'Please send a valid number.' });
        }
        const productReviews = await getProductReviewsById(product_id);
        if(!productReviews){
            return res.status(404).send({ error: 'Product_ID not found.' });
        }
        res.send(productReviews);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error.' });
    }
})

router.post('/:id/reviews', verifyToken, async( req, res, next ) => {
    const { rating, comment } = req.body;
    const product_id = req.params.id;
    const user_id = req.user.id;
    try {
        if(!req.body){
            return res.status(400).send({ error: 'Missing req.body' });
        }
        if(!rating || !comment){
            return res.status(400).send({ error: 'Missing one or more required fields.' });
        }
        const newProductReview = await createProductReviews({ rating, comment, product_id, user_id });
        res.status(201).send(newProductReview);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server error.' });
    }
})