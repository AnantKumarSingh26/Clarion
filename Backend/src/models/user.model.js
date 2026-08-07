import mongoose from "mongoose";
import bcrypt from 'bcrypt'
/** @type {mongoose.SchemaDefinition} */
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true, 'Username already exist'],
        required: [true, "Username required"],
        trim: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required to continue"],
        minlength: true
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

const userModel = mongoose.model('User', userSchema)

export default userModel