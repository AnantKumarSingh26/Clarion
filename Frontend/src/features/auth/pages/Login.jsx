import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hook/useAuthg"


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { handleLogin } = useAuth()

    const submitForm = async (event) => {
        event.preventDefault()

        const payload = {
            email,
            password
        }
        try {
            await handleLogin(payload)
            navigate('/')
            console.log('Login Data: ', payload)
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message)
        }

    }



    return (
        <main className="bg-[#343434] text-amber-50 min-h-screen flex items-center justify-center p-4">

            <form onSubmit={submitForm} className="main w-full max-w-sm border bg-[#2a2929] rounded-3xl p-6 border-[#45C7D4]">
                <div className=" mb-6">
                    <h1 className="text-4xl font-bold mb-1 text-[#45C7D4]">Welcome Back!</h1>
                    <p className="text-gray-400">Sign in with your email and password.</p>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="you@mail.com" className="mail bg-mist-700 p-2 rounded text-white" />
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <label htmlFor="pwd">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="pwd" placeholder="Enter password" className="pwd bg-mist-700 p-2 rounded text-white " />
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <button className=" bg-[#45C7D4] text-black py-1 rounded mt-2  active:scale-[0.95] transition-all font-bold text-[1.2rem]">Login</button>
                    <p className=" text-center mt-5">Don't have an account? <Link className="text-[#45C7D4] hover:cursor-pointer hover:text-[#54ecf9] " to="/register">Register</Link> </p>

                </div>
            </form>
        </main>
    )
}

export default Login