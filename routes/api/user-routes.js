const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Set up POST and DELETE at /api/user/:id/friends/:friendId
router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;