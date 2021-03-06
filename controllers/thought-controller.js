
const { Thought, User } = require('../models');

const ThoughtController = {
    // GET all thoughts
    getAllThoughts(req, res){
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // GET a thought by _id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                // if no thought is found
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // POST a thought
    addThought({ body }, res){
        Thought.create(body)
        .then(( _id ) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // PUT a thought by _id
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            body, 
            { new: true }
        )
            .then(dbThoughtData => {
                // if no thought is found
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // DELETE a thought by _id
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought){
                    return res.status(404).json({ message: 'No thought with this id' })
                }
                res.status(200).json({ message: 'This thought has been deleted' });
                // bonus to remove thought from user
                //User.findOneAndUpdate(
                //    { _id: body.userId },
                //    { $pull: { thoughts: params.thoughtId } },
                //    { new: true }
                //    );
                //console.log(params.userId); undefined
                //console.log(params.thoughtId); shows _id
            })
            //.then(dbUserData => {
            //    if(!dbUserData){
            //        res.status(404).json({ message: 'No user found with this id' });
            //        return;
            //    }
            //    res.json(dbUserData);
            //})
            .catch(err => res.json(err));
    },

    // POST reaction to thought
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No reaction with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // DELETE reaction on thought by _id
    removeReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => {
                if(!dbReactionData){
                    res.status(404).json({ message: 'No reaction with this id' })
                    return;
                }
                res.status(200).json({ message: 'This reaction has been deleted'});
            })
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;