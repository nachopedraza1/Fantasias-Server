import { Router } from 'express';
import { check } from 'express-validator';
import { getReviews, sendReview } from '../controllers/review';
import { validateFields } from '../middlewares/validateFields';



const routerReviews = Router();

routerReviews.post(
    "/sendReview",
    [check("comment", "El comentario no puede estar vacio.").not().isEmpty()],
    validateFields,
    sendReview);

routerReviews.get(
    "/getReviews",
    getReviews)

export default routerReviews;