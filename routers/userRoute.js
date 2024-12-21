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
  registerEmailValidate,
} = require("../validations/userValidations");

router.post(
  "/register_user_phone",
  registerPhoneValidate,
  handleValidationErrors,
  registerUserPhone
);
router.post(
  "/register_user_email",
  registerEmailValidate,
  handleValidationErrors,
  registerUserEmail
);
router.get(
  "/auth_user_phone",
  loginPhoneValidator,
  handleValidationErrors,
  authenticate_user
);

module.exports = router;
