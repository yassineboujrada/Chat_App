const express = require("express");
const cors = require("cors");
const db_mongoose = require("mongoose");
const Routes_  = require("./routes/myRoutes.js");
const msg_router = require("./routes/msgRoutes.js");
const socket = require("socket.io");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use("/api/auth",Routes_);
app.use("/api/messages", msg_router);


db_mongoose.connect(process.env.dbURI, {useNewUrlParser: true,useUnifiedTopology: true,}).then(() => {
    console.log("my database Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });


const server = app.listen(process.env.PORT, () =>
  console.log(`Server run on PORT => ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});