
const { register_me } = require("../controllers/myController");
const Routes_ = require("express").Router();


Routes_.post("/register",register_me);

module.exports = Routes_;