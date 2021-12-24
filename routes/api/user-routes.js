const router = require('express').Router();

//import controller methods from user-controller.js
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//set up GET all users at /api/users (add POST later)
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//set up /:id queriers later once made
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;