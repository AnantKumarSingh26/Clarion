import { io } from "socket.io-client";

export const initializeSocketConnection = () => {
    const socketUrl = import.meta.env.PROD ? '/':'http://localhost:3000';
    const socket = io  (socketUrl, {
        withCredentials: true,
    })

    socket.on('connect',()=>{
        console.log('Connected via client-socket.io ')
    })
}