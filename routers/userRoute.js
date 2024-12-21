const express = require("express");
const router = express.Router();

const { authenticate_user,registerUser } = require("../controllers/userController");
const {
  loginValidator,
  handleValidationErrors,
} = require("../validations/userValidations");

router.get("/auth_user_phone",loginValidator,handleValidationErrors,authenticate_user);
router.post('/register_user',registerUser);

module.exports = router;
