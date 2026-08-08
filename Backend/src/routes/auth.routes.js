import {Router} from "express"
import { registerValidator } from "../validators/auth.validator"

const authRouter = Router()

authRouter.post("/register",registerValidator,)

export default authRouter