
const router = require('express').Router();
const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

// GET all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

// GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;