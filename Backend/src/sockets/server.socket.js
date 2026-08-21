import { Server } from "socket.io";
let io;

export function initSocket(httpServer){
    io= new Server(httpServer,{
        cors:{
            origin: [
                "http://localhost:5173",               // Local frontend
                "https://clarion-eztq.onrender.com"    // Production frontend
            ],
            credentials:true
        }
    })
    console.log("Socket Server is running")

    io.on("connection",(socket)=>{
        console.log("A user connected "+ socket.id)
    })
}

export function getIO(){
    if(!io){
        throw new Error("Socket.io is not initialized")
    }
    return io
}