import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const chat = useChat();

  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-clarion-bgOuter text-clarion-textMain">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-[260px] bg-clarion-bgSidebar border-r border-white/5 p-4 flex flex-col">
        
        {/* LOGO */}
        <div className="relative flex items-center gap-3 px-2 mb-10">
          <div className="absolute w-24 h-24 bg-clarion-primary/20 blur-3xl rounded-full pointer-events-none" />

          <i className="relative z-10 ri-robot-2-line text-4xl text-clarion-primary drop-shadow-[0_0_15px_#36E5F5]" />

          <h1 className="relative z-10 text-[1.5rem] font-bold tracking-wider">
            CLARION
          </h1>
        </div>

        {/* NEW CHAT */}
        <button
          className="
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            bg-clarion-primary
            text-clarion-textButton
            font-semibold
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-[0_0_25px_rgba(54,229,245,0.35)]
          "
        >
          <i className="ri-add-line text-xl" />
          New Chat
        </button>

        {/* CHAT HISTORY */}
        <div className="mt-8 flex-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[11px] uppercase tracking-widest text-clarion-textMuted">
            Recent Chats
          </p>

          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-clarion-textLight hover:bg-clarion-bubbleAI transition">
              <i className="ri-message-3-line" />
              <span className="truncate">Explain React Hooks</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-clarion-textLight hover:bg-clarion-bubbleAI transition">
              <i className="ri-message-3-line" />
              <span className="truncate">Build a REST API</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-clarion-textLight hover:bg-clarion-bubbleAI transition">
              <i className="ri-message-3-line" />
              <span className="truncate">JavaScript Concepts</span>
            </button>
          </div>
        </div>

        {/* USER PROFILE */}
        <div className="border-t border-white/10 pt-4">
          <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-clarion-bubbleAI transition">
            
            <div className="w-10 h-10 rounded-full bg-clarion-primary/15 border border-clarion-primary/30 flex items-center justify-center text-clarion-primary font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-medium truncate">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-clarion-textMuted truncate">
                {user?.email || "user@email.com"}
              </p>
            </div>

            <i className="ri-more-2-fill text-clarion-textMuted" />
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="relative flex-1 flex flex-col bg-clarion-bgBody overflow-hidden">
        
        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-clarion-primary/10 blur-[120px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <header className="relative z-10 h-[70px] px-8 flex items-center justify-between border-b border-white/5">
          
          <div>
            <h2 className="font-medium text-clarion-textMain">
              New Conversation
            </h2>

            <p className="text-xs text-clarion-textMuted mt-1">
              Ask anything, explore everything.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-clarion-textMuted hover:text-clarion-primary hover:bg-clarion-bubbleAI transition">
              <i className="ri-search-line text-xl" />
            </button>

            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-clarion-textMuted hover:text-clarion-primary hover:bg-clarion-bubbleAI transition">
              <i className="ri-settings-3-line text-xl" />
            </button>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
          
          <div className="text-center max-w-2xl mb-10">
            
            {/* AI ICON */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-32 h-32 bg-clarion-primary/20 blur-3xl rounded-full" />

              <div className="relative w-16 h-16 rounded-2xl bg-clarion-bubbleAI border border-clarion-primary/20 flex items-center justify-center">
                <i className="ri-robot-2-line text-3xl text-clarion-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              What do you want to know?
            </h1>

            <p className="mt-4 text-clarion-textMuted">
              Ask questions, explore ideas, write code and discover knowledge
              with Clarion AI.
            </p>
          </div>

          {/* SUGGESTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
            
            <button className="group p-4 text-left rounded-xl bg-clarion-bubbleAI/30 border border-white/5 hover:border-clarion-primary/30 hover:bg-clarion-bubbleAI transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-clarion-primary/10 flex items-center justify-center">
                  <i className="ri-code-s-slash-line text-xl text-clarion-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Help me code
                  </p>
                  <p className="text-xs text-clarion-textMuted mt-1">
                    Build or debug something
                  </p>
                </div>
              </div>
            </button>

            <button className="group p-4 text-left rounded-xl bg-clarion-bubbleAI/30 border border-white/5 hover:border-clarion-primary/30 hover:bg-clarion-bubbleAI transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-clarion-primary/10 flex items-center justify-center">
                  <i className="ri-lightbulb-line text-xl text-clarion-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Explore ideas
                  </p>
                  <p className="text-xs text-clarion-textMuted mt-1">
                    Brainstorm something new
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* INPUT */}
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-3 p-2 pl-5 rounded-2xl bg-clarion-bubbleAI border border-white/10 focus-within:border-clarion-primary/50 transition">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Clarion..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-clarion-textMuted"
              />

              <button
                className="
                  w-11 h-11
                  rounded-xl
                  bg-clarion-primary
                  text-clarion-textButton
                  flex
                  items-center
                  justify-center
                  transition-all
                  hover:scale-105
                  hover:shadow-[0_0_20px_rgba(54,229,245,0.4)]
                "
              >
                <i className="ri-arrow-up-line text-xl font-bold" />
              </button>
            </div>

            <p className="text-center text-[11px] text-clarion-textMuted mt-3">
              Clarion can make mistakes. Check important information.
            </p>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;