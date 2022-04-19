const router = require('express').Router();
const {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.post('/', registerUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
