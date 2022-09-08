import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  "https://knowledge-seekers.herokuapp.com/"
);
export const SocketContext = React.createContext();
