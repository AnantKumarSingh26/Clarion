import dotenv from 'dotenv/config'

import app from "./src/app.js"
import connectToDB from './src/config/database.js'
import dns from 'dns'
import { testAi } from './src/service/ai.service.js'

dns.setServers(['1.1.1.1', '8.8.8.8'])

connectToDB()
testAi()
.catch((err)=>{
    console.error('Mongo connection failed: ',err)
    process.exit(1)
})

app.listen(3000,()=>{
    console.log("Server is running on PORT-3000")
})