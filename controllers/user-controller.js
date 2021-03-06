
const { User } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res){
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // GET a user by id
    getUserById({ params }, res){
        User.findOne({ _id: params.userId })
            .populate([
                {
                    path: 'thoughts',
                    select: '-__v'
                },
                {
                    path: 'friends',
                }
            ])
            .select('-__v')
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // POST a user
    createUser({ body }, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // PUT a user by id
    updateUser({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            body,
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
            .catch(err => res.json(err));
    },

    // DELETE a user by id
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                // if no user is found
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.status(200).json({ message: 'This user has been deleted'});
            })
            .catch(err => res.json(err));
    },

    // POST a user's friend by id
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
            .catch(err => res.json(err));
    },

    // DELETE a user's friend by id
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
            .catch(err => res.json(err));
    }
};

module.exports = userController;