const router = require("express").Router();
const {
  registerUser,
  getUsers,
  getUserById,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.get("/users/:userid", getUserById);
router.post("/users", registerUser);

module.exports = router;
