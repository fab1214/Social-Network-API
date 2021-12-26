const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err);
        })
    },
    //GET thought by ID
    getThoughtById({ params }, res){
        Thought.findOne({_id: params.id})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.json(404).json({ message: "No thought with this id found" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch( err=> {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //post thought
    createThought({ params, body}, res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user with this id found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //add reaction
    addReaction({ params, body }, res){
        //find thought by thoughtId...
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            //push newly created reaction into the reaction array in thought document
            { $push: { reactions: body }},
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "no thought with this id found" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //update thought
    updateThought({params, body }, res){
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "No thought with this id exists" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // /api/thoughts/:thoughtId
    deleteThought({ params }, res){
        Thought.findOneAndDelete({_id: params.id }, {new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "No thought with this id exists" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // /api/thoguhts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res){
        //find thought by id...
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            //pull reactionId from reactions array in thought document
            { $pull: { reactions: { reactionId: params.reactionId }}},
            {new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "No thought with this id exists" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

};
module.exports = thoughtController;