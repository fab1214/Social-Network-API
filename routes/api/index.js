const router = require('express').Router();
const userRoutes = require('./user-routes');

//add prefix of '/users/' to roures created in 'user-routes'
router.use('/users', userRoutes);

module.exports = router;