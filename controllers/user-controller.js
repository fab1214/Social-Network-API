const { User } = require('../models');
//functions go here as methods
const userController = {
    //findAll users query
   getAllUsers(req, res) {
       User.find({})
       .select('-__v')
       .then(dbUserData => res.json(dbUserData))
       .catch(err => {
        res.status(400).json(err);
       })
   },

   //findOne
   getUserById({ params }, res){
       User.findOne({_id: params.id })
       .select('-__v')
       .then(dbUserData => {
           if(!dbUserData){
               res.status(404).json({message: 'User with this id found' });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => {
           console.log(err);
           res.json(400).json(err);
       });
   },

   //create User
   createUser({ body }, res){
       User.create(body)
       .then(dbUserData => res.json(dbUserData))
       .catch(err => {
           console.log(err);
           res.json(400).json(err);
       });
   },

   //update user
    //request id, body to update
   updateUser({ params, body }, res){
       //pass in id, body
       User.findOneAndUpdate({_id: params.id }, body, {new: true, runValidators: true })
       .then(dbUserData => {
           if(!dbUserData){
               res.status(404).json({ message: 'No user with thie id found' });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => {
           console.log(err);
           res.json(400).json(err);
       });
   }
};
module.exports = userController;