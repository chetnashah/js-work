var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
var mongoose = require('mongoose');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
    Genre.find()
    .exec(function(err, list_genres){
        if(err){ return next(err); }
        res.render('genre_list', { title: 'Genre List', genre_list: list_genres});
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    var genreId = mongoose.Types.ObjectId(req.params.id);  
    async.parallel({
        genre: function(cb) {
            Genre.findById(genreId)
            .exec(cb);
        },
        genre_books: function(cb) {
            Book.find({'genre': genreId })
            .exec(cb);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        if (results.genre == null) {
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', { title: 'Genre detail', genre: results.genre, genre_books: results.genre_books});
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form', { title: 'Create Genre'});
};

// Handle Genre create on POST.
// returning a array of middlewares
exports.genre_create_post = [
    // validate that name field is not empty
    body('name', 'Genre name required!').trim().isLength({ min: 1}),

    // sanitize trim and escape in name field
    sanitizeBody('name').trim().escape(),

    // process request after validation and sanitization
    (req, res, next) => {
        // extract validation errors from request
        const errors = validationResult(req);

        // create a object 
        var genre = new Genre({
            name: req.body.name
        });

        if (!errors.isEmpty()) {
            // there are errors, render form again
            res.render('genre_form', {
                title: 'Create genre',
                genre: genre,
                errors: errors.array()
            });
        } else { 
            // data in form is valid
            Genre.findOne({ name: req.body.name })
            .exec(function(err, found_genre) {
                if (err){ return next(err); }

                if (found_genre) {
                    // genre exists, redirect to detail page
                    res.redirect(found_genre.url);
                } else {
                    genre.save(function(err) {
                        if (err){ return next(err);}
                        // genre saved successfully, redirect to detail
                        res.redirect(genre.url);
                    })
                }
            })
        }
    }
]

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
