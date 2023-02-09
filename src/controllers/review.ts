
import { Request, Response } from 'express';
const Review = require("../models/review")

export const sendReview = async (req: Request, res: Response): Promise<void> => {
    try {

        const review = await new Review(req.body);
        review.save();

        res.status(200).json({
            ok: true,
            review
        })

    } catch (error) {
        console.log(error);
    }
}

export const getReviews = async (_req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            ok: true,
            reviews
        });
    } catch (error) {
        console.log(error);
    }
}




