
import { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const submitForm = (event)=>{
    event.preventDefault()
    const payload ={
        username,
        email,
        password
    }
    console.log('Register payload:', payload)

}


  return (
     <main className="bg-[#343434] text-amber-50 min-h-screen flex items-center justify-center p-4">

            <form onSubmit={submitForm} className="main  w-full max-w-sm border bg-[#2a2929] rounded-3xl p-6 border-[#45C7D4]">
                <div className=" mb-4">
                    <h1 className="text-4xl font-bold mb-2  text-[#45C7D4]">Create Account</h1>

                    <p className="text-gray-400">Register with your username, email and password.</p>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="email" >Email</label>

                    <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" placeholder='you@mail.com' className=" border-0 bg-mist-700 p-2 rounded text-white" />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="Username" >Username</label>

                    <input onChange={(e)=>setUsername(e.target.value)} type="text" id="Username" placeholder='Chooser a username' className=" border-0 bg-mist-700 p-2 rounded text-white" />
                </div>

                <div className="flex flex-col gap-1 mb-3">
                    <label htmlFor="pwd">Password</label>

                    <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Create a password' id="pwd" className="bg-mist-700 p-2 rounded text-white " />
                </div>

                <div className="flex flex-col gap-1 mt-4">

                    <button  className=" bg-[#45C7D4] hover:cursor-pointer text-black font-bold py-1 rounded mt-2  active:scale-[0.97] transition-all text-[1.1rem]">Register</button>

                    <p className=" text-center mt-3">Already have an account? <Link className=" text-[#45C7D4] font-bold hover:text-[#57f1ff] cursor-pointer" to="/login">Login</Link> </p>

                </div>
            </form>
        </main>
  )
}

export default Register