import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuthg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      await handleLogin(payload);
      navigate("/");
      console.log("Login Data: ", payload);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };
  const [showIntro, setShowIntro] = useState(
    sessionStorage.getItem("clarionIntroSeen") !== "true"
  );

  const closeIntro = () => {
    sessionStorage.setItem("clarionIntroSeen", "true");
    setShowIntro(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050b12] text-white flex items-center justify-center p-4">

      {/* ================= BACKGROUND ================= */}

      {/* Animated Grid */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Aurora Glow */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      {/* Floating particles */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />
      <div className="particle particle-5" />
      <div className="particle particle-6" />

      {/* Orbit System */}
      <div className="absolute w-[500px] h-[500px] border border-[#45C7D4]/10 rounded-full orbit orbit-1">
        <div className="orbit-dot" />
      </div>

      <div className="absolute w-[700px] h-[700px] border border-[#45C7D4]/5 rounded-full orbit orbit-2">
        <div className="orbit-dot small" />
      </div>

      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b12]/95 backdrop-blur-xl p-4">

          {/* Glow */}
          <div className="absolute w-80 h-80 bg-[#45C7D4]/20 blur-[120px] rounded-full" />

          <div className="relative w-full max-w-lg text-center">

            {/* Robot */}
            <div className="relative flex justify-center mb-8">

              <div className="absolute inset-0 m-auto w-28 h-28 bg-[#45C7D4]/30 blur-3xl rounded-full animate-pulse" />

              <div
                className="
            relative
            w-24 h-24
            rounded-3xl
            bg-[#45C7D4]/10
            border border-[#45C7D4]/40
            flex items-center justify-center
            shadow-[0_0_50px_rgba(69,199,212,0.35)]
          "
              >
                <i className="ri-robot-2-line text-5xl text-[#45C7D4]" />
              </div>

            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-[#45C7D4]">
                Anant {'{ '}<i class="ri-infinity-line"></i>{' }'}
              </span>{" "}
              👋
            </h1>

            {/* Description */}
            <p className="mt-5 text-gray-400 text-base sm:text-lg leading-relaxed">
              I'm a developer who loves building modern,
              interactive applications and exploring new
              technologies.
            </p>

            {/* Clarion */}
            <div className="mt-6">
              <span className="text-[#45C7D4] font-bold tracking-[0.35em] text-sm">
                WELCOME TO <b className='text-red-500 text-2xl'>CLARION </b> 
              </span>
            </div>

            {/* Continue */}
            <button
              onClick={closeIntro}
              className="
          mt-10
          px-8
          py-3
          rounded-xl
          bg-[#45C7D4]
          text-[#061014]
          font-bold

          transition-all duration-300

          hover:scale-105
          hover:shadow-[0_0_35px_rgba(69,199,212,0.5)]

          active:scale-95
        "
            >
              <span className="flex items-center gap-2">
                Continue
                <i className="ri-arrow-right-line" />
              </span>
            </button>

          </div>
        </div>
      )}

      {/* ================= LOGIN CARD ================= */}

      <form
        onSubmit={submitForm}
        className="
          relative z-10
          w-full max-w-md

          p-[1px]
          rounded-[28px]

          animated-border
        "
      >
        <div
          className="
            relative
            overflow-hidden

            bg-[#0a111a]/85
            backdrop-blur-2xl

            rounded-[27px]

            p-6 sm:p-8

            border border-white/5

            shadow-[0_0_100px_rgba(69,199,212,0.12)]
          "
        >

          {/* Top glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#45C7D4]/20 blur-[80px]" />

          {/* Logo */}
          <div className="relative flex flex-col items-center mb-8">

            <div className="relative mb-5">

              <div className="absolute inset-0 bg-[#45C7D4]/40 blur-2xl rounded-full animate-pulse" />

              <div
                className="
                  relative
                  w-16 h-16

                  rounded-2xl

                  bg-[#45C7D4]/10
                  border border-[#45C7D4]/40

                  flex items-center justify-center

                  shadow-[0_0_30px_rgba(69,199,212,0.3)]
                "
              >
                <i className="ri-robot-2-line text-3xl text-[#45C7D4]" />
              </div>

            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="text-[#45C7D4]">Clarion</span>
            </h1>

            <p className="text-gray-400 text-sm mt-2 text-center">
              Your intelligent AI companion
            </p>

          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2 mb-5">

            <label
              htmlFor="email"
              className="text-sm text-gray-300"
            >
              Email Address
            </label>

            <div className="relative">

              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-[#45C7D4]" />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="you@mail.com"
                className="
                  w-full
                  bg-white/[0.03]

                  border border-white/10

                  rounded-xl

                  py-3
                  pl-11
                  pr-4

                  text-sm

                  outline-none

                  transition-all duration-300

                  focus:border-[#45C7D4]/70
                  focus:bg-[#45C7D4]/5
                  focus:shadow-[0_0_20px_rgba(69,199,212,0.1)]
                "
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2 mb-6">

            <label
              htmlFor="pwd"
              className="text-sm text-gray-300"
            >
              Password
            </label>

            <div className="relative">

              <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-[#45C7D4]" />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="pwd"
                placeholder="Enter password"
                className="
                  w-full
                  bg-white/[0.03]

                  border border-white/10

                  rounded-xl

                  py-3
                  pl-11
                  pr-4

                  text-sm

                  outline-none

                  transition-all duration-300

                  focus:border-[#45C7D4]/70
                  focus:bg-[#45C7D4]/5
                  focus:shadow-[0_0_20px_rgba(69,199,212,0.1)]
                "
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              relative
              w-full

              overflow-hidden

              py-3

              rounded-xl

              bg-[#45C7D4]

              text-[#061014]

              font-bold

              transition-all duration-300

              hover:scale-[1.02]

              hover:shadow-[0_0_35px_rgba(69,199,212,0.5)]

              active:scale-[0.97]

              group
            "
          >

            <span className="relative z-10 flex items-center justify-center gap-2">
              Login
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
            </span>

            <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />

          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-400 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-[#45C7D4]
                font-medium

                hover:text-[#70f5ff]

                transition-colors
              "
            >
              Create account
            </Link>

          </p>

        </div>
      </form>
    </main>
  );
};

export default Login;