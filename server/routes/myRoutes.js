
const { register_me,login_me } = require("../controllers/myController");
const Routes_ = require("express").Router();


Routes_.post("/register",register_me);
Routes_.post("/login",login_me);

module.exports = Routes_;