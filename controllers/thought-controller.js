const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err);
        })
    },
    //GET thought by ID
    getThoughtById({ params }, res){
        Thought.findOne({_id: params.id})
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
    }
}
module.exports = thoughtController;