import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../service/mail.service.js";


export async function register(req, res) {

    const { username, email, password } = req.body
    try {
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: 'User with this credential user already registered. Try to Login',
                success: false,
                err: "User already exists"
            })
        }

        const user = await userModel.create({ username, email, password })

        const emailVerificationToken = jwt.sign({
            email:user.email
        },process.env.JWT_SECRET)

        await sendEmail(
             email,
            " Welcome to Clarion",
            ` <p>Hello ${username}</p>
            <p>Thank you for registering at <strong>Clarion</strong>. We're excited to have on board!</p>
            <a href="" ></a>
             <p>Best regards, <br>The Clarion Team    </p>`
        )

        res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(`Error: ${error}`)
        return res.status(500).json({
            success:false,

        })
    }
}