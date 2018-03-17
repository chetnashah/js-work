var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// named exports for all functionality
// Display list of all Authors.
exports.author_list = function(req, res, next) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors) {
        if(err) { return next(err); }
        res.render('author_list', { title: 'Author list', author_list: list_authors});
    })
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {
    async.parallel({
        author: function(cb) {
            Author.findById(req.params.id)
            .exec(cb);
        },
        authors_books: function(cb) {
            Book.find({ 'author': req.params.id }, 'title summary')
            .exec(cb);
        }
    }, function(err, results) {
        if(err) { return next(err); }
        if(results.author == null) {
            var err = new Error('Author not found with id: '+ req.params.id);
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.render('author_form', { title: 'Create Author'});
};

// Handle Author create on POST.
exports.author_create_post = [
    body('first_name').isLength({ min: 1 }).trim()
    .withMessage('First name must be specified')
    .isAlphanumeric()
    .withMessage('First name should only have alphanumeric charachters'),

    body('family_name').isLength({ min: 1}).trim()
    .withMessage('Family name must be specified')
    .isAlphanumeric()
    .withMessage('Family name should only have alphanumeric charachters'),

    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_dath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    //sanitize fields
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('author_form', {
                title: 'Create Author',
                author: req.body,
                errors: errors.array()
            });
            return;
        } else {
            // data from form is valid
            var author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            author.save(function(err, result) {
                if (err) { return next(err); }
                res.redirect(author.url);
            });
        }
    }
]

// Display Author delete form on GET.
// Display Author delete form on GET.
exports.author_delete_get = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author==null) { // No results.
            res.redirect('/catalog/authors');
        }
        // Successful, so render, tell the author and books he has which are to be deleted first.
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
    });

};
// Handle Author delete on POST.
exports.author_delete_post = function(req, res, next) {
    // we get the id of the author to delete in req.body.authorid
    async.parallel({
        author: function(cb) {
            Author.findById(req.body.authorid)
            .exec(cb)
        },
        author_books: function(cb) {
            Book.find({ author: req.body.authorid }).exec(cb);
        }
    }, function(err, results){
        if (err) {
            return next(err);
        }
        if (results.author_books.length > 0) {
            console.log('author got books');
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        } else {
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Successfully deleted author - go back to author list
                res.redirect('/catalog/authors')
            })        
        }
    });
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};