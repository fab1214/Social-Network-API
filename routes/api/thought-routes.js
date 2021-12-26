const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts/ - GET all thoughts
router
    .route('/')
    .get(getAllThoughts);
 
// /api/thoughts/<userId>/ - POST thought
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/<thoughtId>- GET, PUT, DELETE
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;