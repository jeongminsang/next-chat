// import { Server } from "socket.io";

// const socketioHandler = (req: any, res: any) => {
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server);

//     io.on("connection", (socket) => {
//       socket.broadcast.emit("연결되었습니다.");
//       socket.on("hello", (msg) => {
//         socket.emit("hello", "world!");
//       });
//       console.log("연결됨");
//       socket.on("roomsatu", function (data) {
//         console.log(data);
//         io.emit("dewanipara", data);
//       });
//     });

//     res.socket.server.io = io;
//   } else {
//     console.log("socket.io already running");
//   }
//   res.end();
// };

// export default socketioHandler;

import { Server } from "socket.io";

const socketioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, { path: "/api/socketio" });

    io.on("connection", (socket) => {
      console.log("User connected succesfully");

      socket.on("hello", (arg, callback) => {
        callback(arg);
      });

      socket.on("sendmsg", (msg) => {
        io.emit("receivemsg", msg);
      });
      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default socketioHandler;
