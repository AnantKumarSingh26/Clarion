import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { useDispatch } from 'react-redux'
import {
    addNewMessage,
    createNewChat,
    setChats,
    setCurrentChatId,
    setError,
    setLoading,
    addMessages,
    removeChat
} from "../chat.slice";

export const useChat = () => {
    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId, webSearch }) {
        if (!message || !message.trim()) return;
        dispatch(setLoading(true))
        try {
            const data = await sendMessage({ message, chatId, webSearch })
            const { title, chat, aiMessage } = data
            const activeChatId = chatId || chat?._id

            if (!chatId && chat) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title || title || 'New Chat'
                }))
            }

            dispatch(addNewMessage({
                chatId: activeChatId,
                content: message,
                role: 'user'
            }))

            if (aiMessage) {
                dispatch(addNewMessage({
                    chatId: activeChatId,
                    content: aiMessage.content,
                    role: aiMessage.role || 'ai',
                    id: aiMessage._id
                }))
            }

            dispatch(setCurrentChatId(activeChatId))
            return data
        } catch (err) {
            console.error("Failed to send message:", err)
            dispatch(setError(err.response?.data?.message || err.message || "Failed to send message"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() { 
        dispatch(setLoading(true))
        try {
            const data = await getChats()
            const { chats } = data
            const chatsMap = (chats || []).reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt || chat.createdAt
                }
                return acc
            }, {})
            dispatch(setChats(chatsMap))
        } catch (err) {
            console.error("Failed to fetch chats:", err)
            dispatch(setError(err.response?.data?.message || err.message || "Failed to fetch chats"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleOpenChat(chatId) {
        if (!chatId) return
        dispatch(setCurrentChatId(chatId))
        dispatch(setLoading(true))
        try {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = (messages || []).map(msg => ({
                id: msg._id,
                content: msg.content,
                role: msg.role,
                createdAt: msg.createdAt
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages
            }))
        } catch (err) {
            console.error("Failed to fetch messages:", err)
            dispatch(setError(err.response?.data?.message || err.message || "Failed to fetch messages"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    function handleNewChat() {
        dispatch(setCurrentChatId(null))
    }

    async function handleDeleteChat(chatId) {
        if (!chatId) return
        try {
            await deleteChat(chatId)
            dispatch(removeChat(chatId))
        } catch (err) {
            console.error("Failed to delete chat:", err)
            dispatch(setError(err.response?.data?.message || err.message || "Failed to delete chat"))
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleNewChat,
        handleDeleteChat
    }
}