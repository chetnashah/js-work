var Book = require('../models/book');

var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

exports.index = function(req, res, next) {   
    
    async.parallel({
        book_count: function(callback) {
            Book.count(callback);
        },
        book_instance_count: function(callback) {
            BookInstance.count(callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.count({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.count(callback);
        },
        genre_count: function(callback) {
            Genre.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all books.
exports.book_list = function(req, res, next) {
    Book.find({}, 'title_author')
    .populate('author')
    .exec(function(err, list_books) {
        console.log('list_books = ', list_books);
        if(err) { console.error(err); return next(err);}
        res.render('book_list', { title: 'Book List', book_list: list_books });
    })
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
    async.parallel({
        book: function(cb) {
            Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(cb);
        },
        book_instance: function(cb) {
            BookInstance.find({ 'book': req.params.id })
            .exec(cb);
        }
    }, function(err, results) {
        if(err) { return next(err);}
        if (results.book == null) {
            var err = new Error('Book not found for id:'+req.params.id);
            err.status = 404;
            return next(err);
        }
        res.render('book_detail', { title: 'Title', book: results.book, book_instances: results.book_instance});
    })
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
    // our assumption rests that author and genre should be created in advance
    // in order to create a book
    async.parallel({
        authors: function(cb) {
            Author.find(cb);
        },
        genres: function(cb) {
            Genre.find(cb);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('book_form', { title: 'Create book', authors: results.authors, genres: results.genres });
    });
};

// Handle book create on POST.
exports.book_create_post = [
    // convert genre to an array
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            }
            req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
    body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
    body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),
    
    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // process request after validation and sanitization
    (req, res, next) => {
        const errors = validationResult(req);

        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

        if(!errors.isEmpty()) {
            async.parallel({
                authors: function(cb) {
                    Author.find(cb);
                },
                genres: function(cb) {
                    Genre.find(cb);
                }
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                
                res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
            });
        } else {
            // no errors, data is valid, save book.
            book.save(function(err) {
                if(err) { return next(err); }
                res.redirect(book.url);
            });
        }
    }
]

// Display book delete form on GET.
exports.book_delete_get = function(req, res, next) {
    async.parallel({
        book: function(cb) {
            Book.findById(req.params.id).exec(cb);
        },
        bookinstances: function(cb) {
            BookInstance.find({ book: req.params.id }).exec(cb);
        }
    }, function(err, results) {
        console.log(' db results, results: ', results);
        if (err) {
            return next(err);
        }
        // TODO render book_delete where it asks confirmation of deletion
    });
    res.send('you requested to delete book: ' + req.params.id);
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
