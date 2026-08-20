import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState, useRef } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";

const Dashboard = () => {
  const chat = useChat();

  const { user } = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.chat.chats) || {};
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);

  const [inputMessage, setInputMessage] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize socket and load recent chats
  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sorted chat list
  const chatList = Object.values(chats).sort((a, b) => {
    return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
  });

  const activeChat = currentChatId ? chats[currentChatId] : null;
  const activeMessages = activeChat?.messages || [];

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeMessages.length, isLoading]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();

    setInputMessage("");

    await chat.handleSendMessage({
      message: messageText,
      chatId: currentChatId,
      webSearch,
    });
  };

  const handleSuggestionClick = async (prompt) => {
    if (isLoading) return;

    setInputMessage("");

    await chat.handleSendMessage({
      message: prompt,
      chatId: currentChatId,
      webSearch,
    });
  };

  const handleOpenChat = (chatId) => {
    if (chatId === currentChatId) {
      setSidebarOpen(false);
      return;
    }

    chat.handleOpenChat(chatId);

    // Close sidebar after selecting chat on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    chat.handleNewChat();

    setInputMessage("");

    // Close sidebar after new chat on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();

    await chat.handleDeleteChat(chatId);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const userInitial = (
    user?.username?.charAt(0) ||
    user?.name?.charAt(0) ||
    "U"
  ).toUpperCase();

  const userName = user?.username || user?.name || "User";

  const userEmail = user?.email || "user@email.com";

  return (
    <div className="relative flex h-screen overflow-hidden bg-clarion-bgOuter text-clarion-textMain font-sans">

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0 z-30
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:relative
          inset-y-0 left-0
          z-40

          w-[280px]
          h-screen

          bg-clarion-bgSidebar
          border-r border-white/5
          p-4

          flex flex-col
          justify-between
          shrink-0

          transform
          transition-all
          duration-300
          ease-in-out

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:w-0 lg:p-0 lg:border-0 lg:overflow-hidden"
          }
        `}
      >

        {/* ================= SIDEBAR TOP ================= */}
        <div className="flex flex-col h-[calc(100%-70px)]">

          {/* LOGO + CLOSE BUTTON */}
          <div className="flex items-center justify-between mb-6">

            {/* LOGO */}
            <div
              onClick={handleNewChat}
              className="relative flex items-center gap-3 px-2 cursor-pointer select-none group"
            >
              <div className="
                absolute
                w-24 h-24
                bg-clarion-primary/20
                blur-3xl
                rounded-full
                pointer-events-none
                group-hover:bg-clarion-primary/30
                transition
              " />

              <i className="
                relative z-10
                ri-robot-2-line
                text-3xl
                text-clarion-primary
                drop-shadow-[0_0_15px_#36E5F5]
              " />

              <h1 className="
                relative z-10
                text-[1.4rem]
                font-bold
                tracking-wider
                text-clarion-textMain
              ">
                CLARION
              </h1>
            </div>

            {/* CLOSE SIDEBAR */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="
                w-9 h-9
                flex
                items-center
                justify-center
                rounded-lg

                text-clarion-textMuted

                hover:bg-white/10
                hover:text-clarion-primary

                transition
                cursor-pointer
              "
              aria-label="Close sidebar"
            >
              <i className="ri-close-line text-xl" />
            </button>

          </div>

          {/* NEW CHAT BUTTON */}
          <button
            onClick={handleNewChat}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2

              px-4 py-3
              rounded-xl

              bg-clarion-primary
              text-clarion-textButton

              font-semibold
              text-sm

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-[0_0_25px_rgba(54,229,245,0.35)]

              active:scale-[0.98]
              cursor-pointer
            "
          >
            <i className="ri-add-line text-lg font-bold" />
            New Chat
          </button>

          {/* ================= CHAT HISTORY ================= */}
          <div className="mt-6 flex-1 flex flex-col min-h-0">

            <div className="flex items-center justify-between px-2 mb-2">

              <p className="
                text-[11px]
                uppercase
                tracking-wider
                font-semibold
                text-clarion-textMuted
              ">
                Recent Chats
              </p>

              {chatList.length > 0 && (
                <span className="
                  text-[10px]
                  text-clarion-textMuted
                  bg-white/5
                  px-2 py-0.5
                  rounded-full
                ">
                  {chatList.length}
                </span>
              )}

            </div>

            <div className="
              flex-1
              overflow-y-auto
              space-y-1
              pr-1
              [&::-webkit-scrollbar]:w-0.5
            [&::-webkit-scrollbar-track]:bg-zinc-100
            [&::-webkit-scrollbar-thumb]:bg-cyan-500
            hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500
            ">

              {chatList.length === 0 ? (

                <div className="
                  text-center
                  py-8 px-2
                  text-clarion-textMuted
                  text-xs
                ">
                  <i className="
                    ri-chat-voice-line
                    text-2xl
                    mb-2
                    block
                    opacity-40
                  " />

                  No conversations yet. Start a new chat!
                </div>

              ) : (

                chatList.map((item) => {

                  const isActive = item.id === currentChatId;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenChat(item.id)}
                      className={`
                        group
                        relative
                        w-full

                        flex
                        items-center
                        justify-between
                        gap-2

                        px-3 py-2.5
                        rounded-xl
                        text-sm

                        transition-all
                        cursor-pointer

                        ${isActive
                          ? `
                              bg-clarion-bubbleAI
                              text-clarion-primary
                              font-medium
                              border
                              border-clarion-primary/30
                              shadow-sm
                            `
                          : `
                              text-clarion-textLight
                              hover:bg-clarion-bubbleAI/50
                              hover:text-white
                            `
                        }
                      `}
                    >

                      <div className="
                        flex
                        items-center
                        gap-2.5
                        overflow-hidden
                        flex-1
                      ">

                        <i
                          className={`
                            ri-message-3-line
                            text-base
                            shrink-0

                            ${isActive
                              ? "text-clarion-primary"
                              : "text-clarion-textMuted group-hover:text-clarion-textLight"
                            }
                          `}
                        />

                        <span className="truncate text-xs">
                          {item.title || "Untitled Chat"}
                        </span>

                      </div>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={(e) =>
                          handleDeleteChat(e, item.id)
                        }
                        title="Delete chat"
                        className="
                          opacity-0
                          group-hover:opacity-100

                          hover:text-red-400

                          p-1
                          rounded

                          transition

                          text-clarion-textMuted
                          hover:bg-white/10
                        "
                      >
                        <i className="ri-delete-bin-line text-xs" />
                      </button>

                    </div>
                  );
                })
              )}

            </div>

          </div>

        </div>

        {/* ================= USER PROFILE ================= */}
        <div className="border-t border-white/10 pt-3">

          <div className="
            w-full
            flex
            items-center
            gap-3
            p-2
            rounded-xl
            bg-white/5
            border
            border-white/5
          ">

            <div className="
              w-9 h-9
              rounded-full

              bg-clarion-primary/15
              border
              border-clarion-primary/30

              flex
              items-center
              justify-center

              text-clarion-primary
              font-bold
              text-sm
              shrink-0
            ">
              {userInitial}
            </div>

            <div className="
              flex-1
              text-left
              overflow-hidden
            ">

              <p className="
                text-xs
                font-semibold
                truncate
                text-white
              ">
                {userName}
              </p>

              <p className="
                text-[11px]
                text-clarion-textMuted
                truncate
              ">
                {userEmail}
              </p>

            </div>

            <div
              className="
                w-2 h-2
                rounded-full
                bg-clarion-success
                shrink-0
              "
              title="Online"
            />

          </div>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="
        relative
        flex-1
        flex
        flex-col

        min-w-0

        bg-clarion-bgBody
        overflow-hidden
      ">

        {/* BACKGROUND GLOW */}
        <div className="
          absolute
          top-[-150px]
          left-1/2
          -translate-x-1/2

          w-[400px]
          sm:w-[600px]
          h-[350px]

          bg-clarion-primary/10
          blur-[120px]
          rounded-full

          pointer-events-none
        " />

        {/* ================= HEADER ================= */}
        <header className="
          relative z-10

          h-[60px]
          sm:h-[65px]

          px-3
          sm:px-5
          md:px-8

          flex
          items-center
          justify-between

          border-b
          border-white/5

          bg-clarion-bgBody/80
          backdrop-blur-md
        ">

          {/* LEFT SIDE */}
          <div className="
            flex
            items-center
            gap-3
            min-w-0
          ">

            {/* SIDEBAR TOGGLE */}
            <button
              onClick={toggleSidebar}
              className="
                w-9 h-9
                shrink-0

                flex
                items-center
                justify-center

                rounded-lg

                text-clarion-textLight

                hover:bg-white/10
                hover:text-clarion-primary

                transition
                cursor-pointer
              "
              aria-label="Toggle sidebar"
            >
              <i className="ri-menu-2-line text-xl" />
            </button>

            <div className="overflow-hidden">

              <h2 className="
                font-medium
                text-clarion-textMain
                text-sm
                truncate
              ">
                {activeChat
                  ? activeChat.title
                  : "New Conversation"}
              </h2>

              <p className="
                text-[10px]
                sm:text-[11px]

                text-clarion-textMuted
                truncate
              ">
                {activeChat
                  ? "Clarion AI Assistant"
                  : "Ask anything, explore everything."}
              </p>

            </div>

          </div>

          {/* NEW CHAT */}
          <button
            onClick={handleNewChat}
            className="
              px-2.5
              sm:px-3
              py-1.5

              rounded-lg

              bg-white/5
              hover:bg-clarion-bubbleAI

              border
              border-white/5

              text-xs
              text-clarion-textLight

              hover:text-clarion-primary

              transition

              flex
              items-center
              gap-1.5

              cursor-pointer
            "
          >
            <i className="ri-add-line text-sm" />

            <span className="hidden sm:inline">
              New
            </span>

          </button>

        </header>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="
            relative z-20

            mx-3
            sm:mx-6
            md:mx-8

            mt-3

            p-3
            rounded-xl

            bg-red-500/10
            border
            border-red-500/30

            text-red-300
            text-xs

            flex
            items-center
            justify-between
          ">

            <div className="flex items-center gap-2">

              <i className="
                ri-error-warning-line
                text-base
                text-red-400
              " />

              <span>{error}</span>

            </div>

          </div>
        )}

        {/* ================= CHAT BODY ================= */}
        {activeChat && activeMessages.length > 0 ? (

          <div className="
            chat-body
            relative z-10

            flex-1
            overflow-y-auto

            px-3
            sm:px-6
            md:px-12

            py-4
            sm:py-6

            space-y-4
            sm:space-y-5
          ">

            {activeMessages.map((msg, index) => {

              const isUser = msg.role === "user";

              return (
                <div
                  key={msg._id || index}
                  className={`
                    flex
                    items-start
                    gap-2.5
                    sm:gap-3.5

                    ${isUser
                      ? "justify-end"
                      : "justify-start"
                    }
                  `}
                >

                  {/* AI ICON */}
                  {!isUser && (
                    <div className="
                      w-8 h-8
                      rounded-xl

                      bg-clarion-bubbleAI

                      border
                      border-clarion-primary/30

                      flex
                      items-center
                      justify-center

                      text-clarion-primary
                      shrink-0
                      mt-0.5

                      shadow-sm
                    ">
                      <i className="ri-robot-2-line text-base" />
                    </div>
                  )}

                  {/* MESSAGE */}
                  <div
                    className={`
                      max-w-[85%]
                      sm:max-w-[80%]
                      md:max-w-[70%]

                      p-3
                      sm:p-4

                      rounded-2xl

                      text-[13px]
                      sm:text-sm

                      leading-relaxed
                      whitespace-pre-wrap
                      break-words

                      shadow-md
                      overflow-hidden

                      ${isUser
                        ? `
                            bg-clarion-primary
                            text-clarion-textInverse
                            font-medium
                            rounded-tr-none
                          `
                        : `
                            bg-clarion-bubbleAI/80
                            border
                            border-white/5
                            text-clarion-textMain
                            rounded-tl-none
                          `
                      }
                    `}
                  >

                    <MarkdownRenderer
                      content={msg.content}
                    />

                  </div>

                  {/* USER ICON */}
                  {isUser && (
                    <div className="
                      w-8 h-8
                      rounded-xl

                      bg-clarion-primary/20

                      border
                      border-clarion-primary/40

                      flex
                      items-center
                      justify-center

                      text-clarion-primary

                      shrink-0
                      mt-0.5
                    ">
                      <i className="ri-user-fill text-sm" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* THINKING */}
            {isLoading && (
              <div className="
                flex
                items-start
                gap-3.5
                justify-start
                animate-fade-in
              ">

                <div className="
                  w-8 h-8
                  rounded-xl

                  bg-clarion-bubbleAI

                  border
                  border-clarion-primary/30

                  flex
                  items-center
                  justify-center

                  text-clarion-primary
                  shrink-0
                  mt-0.5
                ">
                  <i className="
                    ri-robot-2-line
                    text-base
                    animate-pulse
                  " />
                </div>

                <div className="
                  p-3.5

                  rounded-2xl
                  rounded-tl-none

                  bg-clarion-bubbleAI/80

                  border
                  border-white/5

                  text-clarion-textLight
                  text-xs

                  flex
                  items-center
                  gap-2
                ">

                  <div className="flex space-x-1">

                    <div className="
                      w-2 h-2
                      bg-clarion-primary
                      rounded-full
                      animate-bounce
                      [animation-delay:-0.3s]
                    " />

                    <div className="
                      w-2 h-2
                      bg-clarion-primary
                      rounded-full
                      animate-bounce
                      [animation-delay:-0.15s]
                    " />

                    <div className="
                      w-2 h-2
                      bg-clarion-primary
                      rounded-full
                      animate-bounce
                    " />

                  </div>

                  <span className="
                    text-clarion-textMuted
                    ml-1
                  ">
                    Clarion is thinking...
                  </span>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

        ) : (

          /* ================= HERO ================= */
          <section className="
            relative z-10

            flex-1

            flex
            flex-col

            items-center
            justify-center

            px-4
            sm:px-6

            py-6

            overflow-y-auto
          ">

            <div className="
              text-center
              max-w-2xl
              mb-6
              sm:mb-8
            ">

              {/* AI ICON */}
              <div className="
                relative
                inline-flex
                items-center
                justify-center
                mb-5
              ">

                <div className="
                  absolute
                  w-28 h-28

                  bg-clarion-primary/20
                  blur-3xl
                  rounded-full
                " />

                <div className="
                  relative

                  w-14 h-14
                  sm:w-16 sm:h-16

                  rounded-2xl

                  bg-clarion-bubbleAI

                  border
                  border-clarion-primary/20

                  flex
                  items-center
                  justify-center

                  shadow-lg
                ">

                  <i className="
                    ri-robot-2-line

                    text-2xl
                    sm:text-3xl

                    text-clarion-primary

                    drop-shadow-[0_0_12px_#36E5F5]
                  " />

                </div>

              </div>

              <h1 className="
                text-2xl
                sm:text-3xl
                md:text-4xl

                font-bold
                tracking-tight
                text-white
              ">
                What do you want to know?
              </h1>

              <p className="
                mt-3

                text-clarion-textMuted

                text-xs
                sm:text-sm

                max-w-md
                mx-auto
              ">
                Ask questions, explore ideas, write code and discover knowledge
                with Clarion AI.
              </p>

            </div>

            {/* ================= SUGGESTIONS ================= */}
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2

              gap-3

              w-full
              max-w-xl

              mb-6
            ">

              {/* SUGGESTION 1 */}
              <button
                onClick={() =>
                  handleSuggestionClick(
                    "Help me write a clean React custom hook with TypeScript"
                  )
                }
                className="
                  group
                  p-3.5
                  text-left
                  rounded-xl

                  bg-clarion-bubbleAI/30

                  border
                  border-white/5

                  hover:border-clarion-primary/30
                  hover:bg-clarion-bubbleAI

                  transition
                  cursor-pointer
                "
              >

                <div className="flex items-center gap-3">

                  <div className="
                    w-9 h-9
                    rounded-lg

                    bg-clarion-primary/10

                    flex
                    items-center
                    justify-center

                    text-clarion-primary

                    group-hover:scale-105
                    transition
                    shrink-0
                  ">
                    <i className="ri-code-s-slash-line text-lg" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Help me code
                    </p>

                    <p className="
                      text-[11px]
                      text-clarion-textMuted
                      mt-0.5
                    ">
                      Build or debug something
                    </p>
                  </div>

                </div>

              </button>

              {/* SUGGESTION 2 */}
              <button
                onClick={() =>
                  handleSuggestionClick(
                    "Give me 5 innovative SaaS project ideas to build this year"
                  )
                }
                className="
                  group p-3.5 text-left rounded-xl
                  bg-clarion-bubbleAI/30
                  border border-white/5
                  hover:border-clarion-primary/30
                  hover:bg-clarion-bubbleAI
                  transition cursor-pointer
                "
              >
                <div className="flex items-center gap-3">

                  <div className="
                    w-9 h-9 rounded-lg
                    bg-clarion-primary/10
                    flex items-center justify-center
                    text-clarion-primary
                    group-hover:scale-105
                    transition shrink-0
                  ">
                    <i className="ri-lightbulb-line text-lg" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Explore ideas
                    </p>

                    <p className="text-[11px] text-clarion-textMuted mt-0.5">
                      Brainstorm something new
                    </p>
                  </div>

                </div>
              </button>

              {/* SUGGESTION 3 */}
              <button
                onClick={() =>
                  handleSuggestionClick(
                    "Explain quantum computing and superposition in simple terms"
                  )
                }
                className="
                  group p-3.5 text-left rounded-xl
                  bg-clarion-bubbleAI/30
                  border border-white/5
                  hover:border-clarion-primary/30
                  hover:bg-clarion-bubbleAI
                  transition cursor-pointer
                "
              >
                <div className="flex items-center gap-3">

                  <div className="
                    w-9 h-9 rounded-lg
                    bg-clarion-primary/10
                    flex items-center justify-center
                    text-clarion-primary
                    group-hover:scale-105
                    transition shrink-0
                  ">
                    <i className="ri-compass-3-line text-lg" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Explain concepts
                    </p>

                    <p className="text-[11px] text-clarion-textMuted mt-0.5">
                      Learn topics in simple words
                    </p>
                  </div>

                </div>
              </button>

              {/* SUGGESTION 4 */}
              <button
                onClick={() =>
                  handleSuggestionClick(
                    "Draft a professional cold email to a prospective software client"
                  )
                }
                className="
                  group p-3.5 text-left rounded-xl
                  bg-clarion-bubbleAI/30
                  border border-white/5
                  hover:border-clarion-primary/30
                  hover:bg-clarion-bubbleAI
                  transition cursor-pointer
                "
              >
                <div className="flex items-center gap-3">

                  <div className="
                    w-9 h-9 rounded-lg
                    bg-clarion-primary/10
                    flex items-center justify-center
                    text-clarion-primary
                    group-hover:scale-105
                    transition shrink-0
                  ">
                    <i className="ri-quill-pen-line text-lg" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Write & create
                    </p>

                    <p className="text-[11px] text-clarion-textMuted mt-0.5">
                      Draft emails, posts or notes
                    </p>
                  </div>

                </div>
              </button>

            </div>

          </section>
        )}

        {/* ================= INPUT FOOTER ================= */}
        <div className="
          relative z-10

          p-2
          sm:p-4
          md:px-12

          bg-clarion-bgBody/95

          border-t
          border-white/5
        ">

          <form
            onSubmit={handleSendMessage}
            className="
              w-full
              max-w-3xl
              mx-auto
            "
          >

            <div className="
              flex
              items-center

              gap-1.5
              sm:gap-2.5

              p-1.5
              pl-2
              sm:pl-3

              rounded-2xl

              bg-clarion-bubbleAI

              border
              border-white/10

              focus-within:border-clarion-primary/50
              focus-within:ring-1
              focus-within:ring-clarion-primary/30

              transition
              shadow-inner
            ">

              {/* WEB SEARCH */}
              <button
                type="button"
                onClick={() =>
                  setWebSearch((prev) => !prev)
                }
                title={
                  webSearch
                    ? "Web Search Active (Click to turn off)"
                    : "Enable Web Search"
                }
                className={`
                  flex
                  items-center
                  gap-1.5

                  px-2
                  sm:px-3

                  py-2

                  rounded-xl

                  text-xs
                  font-medium

                  transition-all
                  duration-200

                  cursor-pointer
                  shrink-0
                  select-none

                  ${webSearch
                    ? `
                        bg-clarion-primary/20
                        text-clarion-primary

                        border
                        border-clarion-primary/40

                        shadow-[0_0_12px_rgba(54,229,245,0.25)]
                      `
                    : `
                        text-clarion-textMuted

                        hover:text-clarion-textLight
                        hover:bg-white/5

                        border
                        border-transparent
                      `
                  }
                `}
              >

                <i
                  className={`text-base ${webSearch
                    ? "ri-global-fill"
                    : "ri-global-line"
                    }`}
                />

                <span className="
                  hidden
                  sm:inline
                  text-[11px]
                  font-semibold
                ">
                  Search
                </span>

              </button>

              {/* INPUT */}
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) =>
                  setInputMessage(e.target.value)
                }
                placeholder={
                  webSearch
                    ? "Search live web..."
                    : "Message Clarion..."
                }
                disabled={isLoading}
                className="
                  flex-1
                  min-w-0

                  bg-transparent
                  outline-none

                  text-[13px]
                  sm:text-sm

                  text-white

                  placeholder:text-clarion-textMuted

                  disabled:opacity-50
                "
              />

              {/* SEND */}
              <button
                type="submit"
                disabled={
                  isLoading || !inputMessage.trim()
                }
                className="
                  w-10 h-10

                  rounded-xl

                  bg-clarion-primary
                  text-clarion-textButton

                  flex
                  items-center
                  justify-center

                  transition-all
                  duration-200

                  hover:scale-105
                  hover:shadow-[0_0_20px_rgba(54,229,245,0.4)]

                  active:scale-95

                  disabled:opacity-40
                  disabled:pointer-events-none

                  cursor-pointer
                  shrink-0
                "
              >

                {isLoading ? (
                  <i className="
                    ri-loader-4-line
                    text-lg
                    animate-spin
                  " />
                ) : (
                  <i className="
                    ri-arrow-up-line
                    text-lg
                    font-bold
                  " />
                )}

              </button>

            </div>

            <p className="
              text-center
              text-[10px]
              text-clarion-textMuted
              mt-2
            ">
              Clarion can make mistakes. Check important information.
            </p>

          </form>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;

