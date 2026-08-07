import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app.js"
import connectToDB from './src/config/database.js'
import dns from 'dns'

dns.setServers(['1.1.1.1', '8.8.8.8'])

connectToDB()

app.listen(3000,()=>{
    console.log("Server is running on PORT-3000")
})