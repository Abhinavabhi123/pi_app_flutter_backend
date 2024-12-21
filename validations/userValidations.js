const { body, validationResult } = require("express-validator");


//* function for checking the validation condition is correct or not
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// * Validation code for authentication with phone number
const loginValidator = [
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must have 10 digits."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

module.exports = {
  handleValidationErrors,
  loginValidator,
};
