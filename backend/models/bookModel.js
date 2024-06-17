import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true,
        },
        PublishYear: {
            type: Number,

        }
    },

    {timestamps: true,}
);


export const Book = mongoose.model('Book', bookSchema);