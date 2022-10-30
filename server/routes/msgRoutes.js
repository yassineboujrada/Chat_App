const { addMessage, getMessages } = require("../controllers/msgController");
const msg_router = require("express").Router();

msg_router.post("/addmsg/", addMessage);
msg_router.post("/getmsg/", getMessages);

module.exports = msg_router;
