const express = require("express");
const passportConfig = require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

mongoose.connect(keys.mongodbId);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const io = new Server(server, {
  cors: {
    origin: "https://crown-db-50da8.web.app/",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server is Running");
});
