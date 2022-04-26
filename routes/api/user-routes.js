
const router = require('express').Router();
const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, deleteFriend } = require('../../controllers/user-controller');

// GET all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

// GET one, PUT, and DELETE at /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// POST and DELETE friends at /api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend)

// POST and DELETE friends at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend)

module.exports = router;