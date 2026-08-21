import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../service/mail.service.js";


export async function register(req, res) {
    const { username, email, password } = req.body
    let user;
    try {
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: 'User with this credential already registered. Try to Login',
                success: false,
                err: "User already exists"
            })
        }

        user = await userModel.create({ username, email, password })

        const emailVerificationToken = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1d' }) //token for email verification

        try {
            const serverUrl = process.env.SERVER_URL || "http://localhost:3000";
            await sendEmail(
                email,
                " Welcome to Clarion",
                ` <p>Hello ${username}</p>
                <p>Thank you for registering at <strong>Clarion</strong>. We're excited to have you on board!</p>
                <p><a href="${serverUrl}/api/auth/verify-email?token=${emailVerificationToken}">Verify email</a></p>
                 <p>Best regards, <br>The Clarion Team</p>`
            )
        } catch (mailErr) {
            console.error("Mail sending failed during registration:", mailErr);
            // Rollback the created user so user doesn't get stuck in unverified state
            if (user && user._id) {
                await userModel.findByIdAndDelete(user._id);
            }
            return res.status(500).json({
                message: "Failed to send verification email. Please check your email credentials in .env.",
                success: false,
                err: mailErr.message
            });
        }

        res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(`Error in register: ${error}`)
        return res.status(500).json({
            message: error.message || "Registration failed",
            success: false,
        })
    }
}

export async function verifyEmail(req, res) {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).send("<h3>Verification token is missing.</h3>");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: 'User not found'
            })
        }
        user.verified = true
        await user.save();

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const html = `
        <div style="font-family: sans-serif; text-align: center; padding: 40px;">
            <h1 style="color: #45C7D4;">Email Verified Successfully!</h1>
            <p style="color: #555;">Your email has been verified. You can login to use services.</p>
            <a href="${clientUrl}/login" style="display: inline-block; padding: 10px 20px; background-color: #45C7D4; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">Go to Login</a>
        </div>
        `
        res.send(html)
    } catch (err) {
        return res.status(400).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 40px;">
            <h1 style="color: #e53e3e;">Verification Failed</h1>
            <p style="color: #555;">Invalid or expired verification token.</p>
        </div>
        `);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email",
            success: false,
            err: "user Not found"
        })
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid Password",
            success: false,
            err: "Password don't match"
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            message: 'Please verify your email before logging in',
            success: false,
            err: 'Email not verified'
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token)

    res.status(200).json({
        message: 'Login Successful',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function getMe(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select('-password')

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            success: false,
            err: 'User not Registered'
        })
    }
    res.status(200).json({
        message: 'User details are :',
        success: true,
        user

    })
}

export async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logged out successfully",
        success: true
    });
}