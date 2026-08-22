import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RegisterPopup = ({ isOpen, email, onClose }) => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        if (onClose) onClose();
        setTimeout(() => {
            navigate("/login");
        }, 0);
    };
    useEffect(() => {
        if (!isOpen) return;

        setCountdown(5);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/login");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, navigate]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b12]/90 backdrop-blur-xl transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute w-80 h-80 bg-[#45C7D4]/20 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute w-60 h-60 bg-[#167a86]/25 blur-[100px] rounded-full pointer-events-none" />

            {/* Popup Card */}
            <div className="relative z-10 w-full max-w-md p-[1px] rounded-[28px] animated-border shadow-[0_0_80px_rgba(69,199,212,0.25)]">
                <div className="relative overflow-hidden bg-[#0a111a]/95 backdrop-blur-2xl rounded-[27px] p-6 sm:p-8 border border-white/10 text-center">
                    {/* Top subtle glow */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-28 bg-[#45C7D4]/25 blur-[70px]" />

                    {/* Success Icon */}
                    <div className="relative flex justify-center mb-5">
                        <div className="absolute inset-0 m-auto w-20 h-20 bg-[#45C7D4]/30 blur-2xl rounded-full animate-pulse" />
                        <div className="relative w-20 h-20 rounded-3xl bg-[#45C7D4]/10 border border-[#45C7D4]/40 flex items-center justify-center shadow-[0_0_40px_rgba(69,199,212,0.35)]">
                            <i className="ri-mail-send-line text-4xl text-[#45C7D4]" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        Registration Successful!
                    </h2>

                    {/* User Email Pill (if available) */}
                    {email && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#45C7D4]/10 border border-[#45C7D4]/30 text-[#45C7D4] text-xs font-medium mb-3 max-w-full">
                            <i className="ri-mail-line" />
                            <span className="truncate max-w-[240px]">{email}</span>
                        </div>
                    )}

                    {/* Core Message */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                        An email has been sent to your mail check it and verify to login
                    </p>

                    {/* Progress Bar & Countdown Indicator */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                            <span className="flex items-center gap-1.5">
                                <i className="ri-time-line text-[#45C7D4]" />
                                Auto-redirecting
                            </span>
                            <span className="font-semibold text-[#45C7D4]">
                                {countdown}s
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#167a86] to-[#45C7D4] transition-all duration-1000 ease-linear rounded-full"
                                style={{ width: `${(countdown / 5) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="button"
                        onClick={handleGoToLogin}
                        className="
              relative
              w-full
              overflow-hidden
              py-3.5
              rounded-xl
              bg-[#45C7D4]
              text-[#061014]
              font-bold
              text-sm sm:text-base
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_35px_rgba(69,199,212,0.5)]
              active:scale-[0.97]
              cursor-pointer
              group
            "
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>Go to Login</span>
                            <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                        </span>

                        {/* Button shine animation */}
                        <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPopup;