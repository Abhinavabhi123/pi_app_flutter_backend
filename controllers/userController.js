const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const db = require("../database");

const saltRounds = parseInt(process.env.BCRYPT_SALT, 10);
const jwtSecret = process.env.JWT_SECRET;
const Users = db.user;

const registerUserPhone = async (req, res) => {
  try {
    const { phone, password, name } = req.body;

    const userData = await Users.findOne({ where: { phone } });

    if (!userData) {
      const hashedPassword = await bcrypt.hash(String(password), saltRounds);
      await Users.create({
        phone,
        password: hashedPassword,
        name,
      }).then(() => {
        console.log("User registered successfully with phone number");
        return res
          .status(200)
          .send({ message: "Registered Successfully", isSuccess: true });
      });
    } else {
      res.status(409).send({
        isSuccess: false,
        message: "The phone number is already registered",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const registerUserEmail = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    const userData = await Users.findOne({ where: { email } });
    if (!userData) {
      const hashedPassword = await bcrypt.hash(String(password), saltRounds);

      await Users.create({
        name,
        email,
        password: hashedPassword,
      }).then(() => {
        console.log("User registered successfully with email");
        return res
          .status(200)
          .send({ isSuccess: true, message: "Registered successfully" });
      });
    } else {
      res.status(409).send({
        isSuccess: false,
        message: "The email address is already registered",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// *user Authentication with phone number
const authenticate_user_phone = async (req, res) => {
  try {
    const { phone, password } = req.headers;

    const userData = await Users.findOne({ where: { phone } });
    console.log(userData);

    if (userData) {
      const comparedPass = await bcrypt.compare(
        password,
        userData.dataValues?.password
      );
      if (comparedPass) {
        const token = jwt.sign(
          {
            id: userData.dataValues?.id,
            phone: userData.dataValues?.phone,
          },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).send({
          isSuccess: true,
          message: "Authentication Successful",
          token: token,
        });
      } else {
        return res
          .status(404)
          .send({ isSuccess: false, message: "Incorrect password" });
      }
    } else {
      console.log("no data found");
      return res.status(404).send({
        isSuccess: false,
        message: "This phone number is not registered!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// * User Authentication with email
const authenticate_user_email = async (req, res) => {
  try {
    const { email, password } = req.headers;
    const userData = await Users.findOne({ where: {email} });
    if (userData) {
      const comparePass = await bcrypt.compare(
        password,
        userData?.dataValues?.password
      );
      if (comparePass) {
        const token = jwt.sign(
          {
            id: userData.dataValues?.id,
            phone: userData.dataValues?.phone,
          },
          jwtSecret,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).send({
          isSuccess: true,
          message: "Authentication Successful",
          token: token,
        });
      } else {
        return res
          .status(404)
          .send({ isSuccess: false, message: "Incorrect password" });
      }
    } else {
      return res
        .status(404)
        .send({ isSuccess: false, message: "This email is not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  registerUserPhone,
  registerUserEmail,
  authenticate_user_phone,
  authenticate_user_email,
};
