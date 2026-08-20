import { Router } from "express"
import { getMe, login, register, verifyEmail, logout } from '../controller/auth.controller.js'
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { authUser } from "../middleware/auth.middleware.js"

const authRouter = Router()

// @route get

authRouter.post("/register", registerValidator, register)

authRouter.post("/login", loginValidator, login)

authRouter.get("/get-me", authUser, getMe)

authRouter.get("/verify-email", verifyEmail)

authRouter.post("/logout", logout);

export default authRouter