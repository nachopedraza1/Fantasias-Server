import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema({
    stars: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
});


module.exports = model("Review", ReviewSchema);