var express = require('express');

var router = express.Router();

// require controller modules, where all the handler functions are present.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

// book routes
router.get('/', book_controller.index);

router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);

router.get('/book/:id/delete', book_controller.book_delete_get);
router.post('/book/:id/delete', book_controller.book_delete_post);

router.get('/book/:id/update', book_controller.book_update_get);
router.post('/book/:id/update', book_controller.book_update_post);

// get request for one book
router.get('/book/:id', book_controller.book_detail);
// get all books
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);
router.post('/author/create', author_controller.author_create_post);

router.get('/author/:id/delete', author_controller.author_delete_get);
router.post('/author/:id/delete', author_controller.author_delete_post);

router.get('/author/:id/update', author_controller.author_update_get);
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);

router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

router.get('/genre/:id/update', genre_controller.genre_update_get);
router.post('/genre/:id/update', genre_controller.genre_update_post);

router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;