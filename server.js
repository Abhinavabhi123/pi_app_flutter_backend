const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const app = express();
const Port = process.env.PORT || 3000;
const db = require("./database");

const userRoutes = require("./routers/userRoute");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

db.sequelize.sync({ force: false }).then(() => {
  console.log(`re-sync done ! `);
});

app.use('/',userRoutes)

app.listen(Port, () => {
  console.log(`server running successfully on port ${Port} ⚡`);
});
