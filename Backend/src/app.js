import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import chatRouter from './routes/chat.routes.js'
import morgan from "morgan"
import path from 'path'

const app = express()
const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static("./public"))

app.use(cors({
   origin: [
      "http://localhost:5173",
      "https://clarion-eztq.onrender.com"
   ],
   credentials: true,
   methods: ["GET", "POST", 'PUT', 'DELETE']
}))


app.get('/', (req, res) => {
   res.json({
      message: "Server is Running"
   })
})

app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

export default app