const express = require("express");
const app = new express();

const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.json()); 

const cors = require("cors");
app.use(cors());

require("dotenv").config();
require("./db/connection");


const otpRoutes = require("./routes/otpRoutes");
app.use("/otp", otpRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});