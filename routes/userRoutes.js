const router = require('express').Router();
const {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:_id', getUserById);
router.post('/users', registerUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
