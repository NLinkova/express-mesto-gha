const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.patch('/me', updateUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
