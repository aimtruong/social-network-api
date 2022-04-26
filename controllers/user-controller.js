
const { User } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res){
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET a user
    getUserById({ params }, res){
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST a user
    createUser({ body }, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT a user
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a user
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST a user's friend
    addFriend({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body.userId } },
            { new: true, runValidators: true }
            )
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a user's friend
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;