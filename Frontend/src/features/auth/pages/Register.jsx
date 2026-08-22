import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuthg";
import RegisterPopup from "./RegisterPopup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !email.trim() || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    if (username.trim().length < 3) {
      setErrorMessage("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    const payload = {
      username: username.trim(),
      email: email.trim(),
      password,
    };

    try {
      setIsSubmitting(true);
      await handleRegister(payload);
      setShowSuccessPopup(true);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050b12] text-white flex items-center justify-center p-4">
      
      {/* ================= BACKGROUND ================= */}

      {/* Animated Cyber Grid */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Aurora Glow */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      {/* Floating Particles */}
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

      {/* ================= REGISTER CARD ================= */}

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
          {/* Top Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#45C7D4]/20 blur-[80px]" />

          {/* ================= LOGO + HEADER ================= */}

          <div className="relative flex flex-col items-center mb-7">
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
                <i className="ri-user-add-line text-3xl text-[#45C7D4]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Create your{" "}
              <span className="text-[#45C7D4]">
                Clarion
              </span>
            </h1>

            <p className="text-gray-400 text-sm mt-2 text-center">
              Join and start exploring with your AI companion
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
              <i className="ri-error-warning-line text-base" />
              <span>{errorMessage}</span>
            </div>
          )}



          {/* ================= EMAIL ================= */}

          <div className="flex flex-col gap-2 mb-4">
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
                  transition-all
                  duration-300
                  focus:border-[#45C7D4]/70
                  focus:bg-[#45C7D4]/5
                  focus:shadow-[0_0_20px_rgba(69,199,212,0.1)]
                "
              />
            </div>
          </div>

          {/* ================= USERNAME ================= */}

          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="username"
              className="text-sm text-gray-300"
            >
              Username
            </label>

            <div className="relative">
              <i className="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-[#45C7D4]" />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Choose a username"
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
                  transition-all
                  duration-300
                  focus:border-[#45C7D4]/70
                  focus:bg-[#45C7D4]/5
                  focus:shadow-[0_0_20px_rgba(69,199,212,0.1)]
                "
              />
            </div>
          </div>

          {/* ================= PASSWORD ================= */}

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
                placeholder="Create a password (min. 6 chars)"
                minLength={6}
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
                  transition-all
                  duration-300
                  focus:border-[#45C7D4]/70
                  focus:bg-[#45C7D4]/5
                  focus:shadow-[0_0_20px_rgba(69,199,212,0.1)]
                "
              />
            </div>
          </div>

          {/* ================= REGISTER BUTTON ================= */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              relative
              w-full
              overflow-hidden
              py-3
              rounded-xl
              bg-[#45C7D4]
              text-[#061014]
              font-bold
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_35px_rgba(69,199,212,0.5)]
              active:scale-[0.97]
              disabled:opacity-60
              disabled:cursor-not-allowed
              group
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>

            {/* Button shine animation */}
            {!isSubmitting && (
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            )}
          </button>

          {/* ================= LOGIN LINK ================= */}

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-[#45C7D4]
                font-medium
                hover:text-[#70f5ff]
                transition-colors
              "
            >
              Login
            </Link>
          </p>

        </div>
      </form>

      {/* ================= SUCCESS POPUP ================= */}
      <RegisterPopup
        isOpen={showSuccessPopup}
        email={email}
        onClose={() => setShowSuccessPopup(false)}
      />
    </main>
  );
};

export default Register;