import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(
  // "https://knowledge-seekers.herokuapp.com/"
  "http://localhost:5000/"
);
export const SocketContext = React.createContext();
