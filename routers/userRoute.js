const express = require("express");
const router = express.Router();

const {
  authenticate_user,
  registerUserPhone,
  registerUserEmail,
} = require("../controllers/userController");
const {
  loginPhoneValidator,
  handleValidationErrors,
  registerPhoneValidate,
} = require("../validations/userValidations");

router.get(
  "/auth_user_phone",
  loginPhoneValidator,
  handleValidationErrors,
  authenticate_user
);
router.post(
  "/register_user_phone",
  registerPhoneValidate,
  handleValidationErrors,
  registerUserPhone
);
router.post("/register_user_email", registerUserEmail);

module.exports = router;
