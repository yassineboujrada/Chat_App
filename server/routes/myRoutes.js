
const { register_me,login_me,pic_me,getAllUsers } = require("../controllers/myController");
const Routes_ = require("express").Router();


Routes_.post("/register",register_me);
Routes_.post("/login",login_me);
Routes_.post("/setAvatar/:id",pic_me);
Routes_.get("/allusers/:id", getAllUsers);

module.exports = Routes_;