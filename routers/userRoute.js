const express = require("express");
const router = express.Router();

const {
  registerUserPhone,
  registerUserEmail,
  authenticate_user_phone,
  authenticate_user_email,
} = require("../controllers/userController");
const {
  loginPhoneValidate,
  handleValidationErrors,
  registerPhoneValidate,
  registerEmailValidate,
  loginEmailValidate
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
  loginPhoneValidate,
  handleValidationErrors,
  authenticate_user_phone
);
router.get("/auth_user_email",loginEmailValidate,handleValidationErrors,authenticate_user_email)

module.exports = router;
