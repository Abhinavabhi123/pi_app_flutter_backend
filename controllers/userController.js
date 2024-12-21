const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const db = require("../database");

const saltRounds = parseInt(process.env.BCRYPT_SALT, 10);;
const jwtSecret = process.env.JWT_SECRET;
const Users = db.user;

const authenticate_user = async (req, res) => {
  try {
    const { phone, password } = req.body;
    await Users.findOne({ where: { phone } })
      .then(async (response) => {
        const comparedPass = await bcrypt.compare(
          password,
          response.dataValues?.password
        );
        if (comparedPass) {
          const token = jwt.sign(
            {
              id: response.dataValues?.id,
              phone: response.dataValues?.phone,
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
        }
        return res
          .status(404)
          .send({ isSuccess: false, message: "Incorrect password" });
      })
      .catch(() => {
        console.log("no data found");
        return res.status(404).send({
          isSuccess: false,
          message: "This phone number is not registered!",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {

  const { phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (hashedPassword) {
    await Users.create({
      phone,
      password: hashedPassword,
    }).then(() => {
      console.log("success");
      return res
        .status(200)
        .send({ message: "registered Successfully", isSuccess: true });
    });
  }
};

module.exports = {
  authenticate_user,
  registerUser,
};
