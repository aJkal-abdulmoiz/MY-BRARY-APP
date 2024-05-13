const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// All books
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const books = await Book.find(searchOptions);
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// New book
router.get('/new', (req, res) => {
    res.render('books/new', { book: new Book() });
});

// Create book
router.post('/', async (req, res) => {
    const book = new Book({
        Authorname: req.body.Authorname,
        Title: req.body.Title,
        reviews: req.body.reviews
    });
    try {
        const newBook = await book.save();
        res.redirect('/books'); 
    } catch (err) {
        console.error(err);
        res.render('books/new', {
            book: book,
            errorMessage: 'Error Creating Book'
        });
    }
});

module.exports = router;
