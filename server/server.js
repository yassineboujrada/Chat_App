const express = require("express");
const cors = require("cors");
const db_mongoose = require("mongoose");
const Routes_  = require("./routes/myRoutes.js");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use("/api/auth",Routes_);


db_mongoose.connect(process.env.dbURI, {useNewUrlParser: true,useUnifiedTopology: true,}).then(() => {
    console.log("my database Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });


const server = app.listen(process.env.PORT, () =>
  console.log(`Server run on PORT => ${process.env.PORT}`)
);