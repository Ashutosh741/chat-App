// nodeserver which will handle socket io connetion

const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
 // if any new user joins , let other connected user know
 socket.on("new-user-joined", (name) => {
  //   console.log("New User", name);
  users[socket.id] = name;
  socket.broadcast.emit("user-joined", name);
 });
 // if somenone send s message, broadcast it to other people
 socket.on("send", (message) => {
  socket.broadcast.emit("receive", {
   message: message,
   name: users[socket.id],
  });
 });

 // if someone leaves the chat

 socket.on("disconnect", (message) => {
  socket.broadcast.emit("left", users[socket.id]);
  delete users[socket.id];
 });
});
