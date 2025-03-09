const router = require("express").Router();
const { registerValidation } = require("../middlewares/UserValidation");
const { registerUser, getAllUsers, updateUser, deleteUser, getGenders } = require("../controllers/UserController");

router.post("/register", registerValidation, registerUser);
router.get("/genders", getGenders);
router.get("/usersData", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;



