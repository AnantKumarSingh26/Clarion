import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
   res.json({
    message:"Server is Running"
   })
})

app.use('/api/auth', authRouter)

export default app