const { User, Thought } = require('../models');
//functions go here as methods
const userController = {
    //findAll users query
   getAllUsers(req, res) {
       User.find({})
       .populate({
           path: 'thoughts',
           select: '-__v'
       })
       .populate({
           path: 'friends',
           select: '-__v'
       })
       .select('-__v')
       .then(dbUserData => res.json(dbUserData))
       .catch(err => {
        res.status(400).json(err);
       })
   },

   //findOne
   getUserById({ params }, res){
       User.findOne({_id: params.id })
       .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
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
       User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
       .then(dbUserData => {
           if(!dbUserData){
               res.status(404).json({ message: 'No user with this id found' });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => {
           console.log(err);
           res.json(400).json(err);
       });
   },

   //delete user
   deleteUser({ params }, res){
       User.findOneAndDelete({ _id: params.id })
       .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user with this id found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.json(400).json(err);
    });
   },

   // /api/users/:userId/friends/:friendId
   addFriend({ params }, res){
       User.findOneAndUpdate(
           {_id: params.id },
           //push user id into friends array (creates :friendId)
           { $push: { friends: params.friendId } },
           { new: true, runValidators: true }
       )
           .then(dbUserData => {
               if(!dbUserData){
                   res.status(404).json({ message: 'No user with id found' });
                   return;
                }
               res.json(dbUserData);
           })
           .catch(err => {
               res.status(400).json(err);
           })
   },

   deleteFriend({ params }, res){
       User.findOneAndUpdate(
           {_id: params.id },
           { $pull: { friends: params.friendId } },
           { new: true, runValidators: true }
       )
       .then(dbUserData => {
           if(!dbUserData){
               res.status(404).json({ message: 'No user with this id found' });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => {
           res.status(400).json(err);
       });
   }
};

module.exports = userController;