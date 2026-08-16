import dotenv from 'dotenv/config'

import app from "./src/app.js"
import connectToDB from './src/config/database.js'
import dns from 'dns'
import  http  from 'http'
import { initSocket } from './src/sockets/server.socket.js'

const httpServer = http.createServer(app)
initSocket(httpServer)

dns.setServers(['1.1.1.1', '8.8.8.8'])

connectToDB()
    .catch((err) => {
        console.error('Mongo connection failed: ', err)
        process.exit(1)
    })

httpServer.listen(3000, () => {
    console.log("Server is running on PORT-3000")
})