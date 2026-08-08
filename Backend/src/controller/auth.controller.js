import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'



async function register(req, res) {

    const { userName, email, password } = req.body
    try {
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { userName }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: 'User with this credential user already registered. Try to Login',
                success: false,
                err: "User already exists"
            })
        }

        const user = await userModel.create({ userName, email, password })
    } catch (error) {

    }
}