import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  "https://sleepy-cove-90575.herokuapp.com/"
);
// export const socket = socketio.connect("https://ks-api.vercel.app");
export const SocketContext = React.createContext();
