import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();




//Reoute for save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.PublishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishyear',
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            PublishYear: req.body.PublishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
})

//Route for GET all books from db
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});


//Route for GET all books from db by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});

//Route for update a book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.PublishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishyear',
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//Route for delete a book
router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


export default router;