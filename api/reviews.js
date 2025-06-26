import express from "express";
const router = express.Router();
export default router;

import {getReviews, getReviewsById, createReview, updateReview, deleteReview} from '../db/queries/reviews.js';

router.get("/", async (req, res, next) => {
    try{
        const reviews = await getReviews();
        return res.send(reviews);
    }catch(error){
        console.error("Could not fetch reviews");
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        if(!Number.isInteger(id) && id < 0){
            return res.status(400).send({error: "Review not found"});
        }

        const review = await getReviewsById(id);
        if(!review){
            return res.status(404).send({error: "Forbidden: Review not found"});
        }
        res.send(review);
    }catch(error){
        next(error);
    }
});


router.put("/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        if(!req.body){
            return res.status(400).send({error: "Missing req.body"});
        }

        const {rating, comment, product_id} = req.body;
        if(!rating || !comment || !product_id){
            return res.status(404).send({error: "Missing required fields"});
        }

        if(!Number.isInteger(id) && id < 0){
            return res.status(400).send({error: "Please send a valid review"});
        }

        const review = await getReviewsById(id);
        if(!review){
            return res.status(404).send({error: "Review does not exist"});
        }

        const updated = await updateReview(id, {rating, comment, product_id});
        res.status(200).send(updated);
    }catch(error){
        console.error("Could not update review");
    }
});

router.delete("/", async (req, res, next) => {
    try{
        const id = req.params.id;
        if(!Number.isInteger(id) && id < 0){
            res.status(400).send({error: "Please send a valid review"});
        }

        const review = await getReviewsById(id);
        if(!review){
            return res.status(404).send({error: "Review not found"});
        }

        const deleted = await deleteReview(id);
        if(!deleted){
            res.status(404).send({error: "Review does not exist"});
        }
        res.sendStatus(204);
        }catch(error){
        next(error);
    }
});