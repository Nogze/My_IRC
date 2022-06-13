import { createContext } from "react";
import { io } from "socket.io-client"

export const callSocket = io('http://localhost:8080')
export const socketContext = createContext();
