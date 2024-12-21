const { body, header, validationResult } = require("express-validator");

//* function for checking the validation condition is correct or not
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// * Validation code for authentication with phone number
const loginPhoneValidator = [
  header("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must have 10 digits."),
  header("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

//*user sign up with phone validation
const registerPhoneValidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name field only contain string values"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must have 10 digits."),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

const registerEmailValidate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name field only contain string values"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

module.exports = {
  handleValidationErrors,
  loginPhoneValidator,
  registerPhoneValidate,
  registerEmailValidate,
};
