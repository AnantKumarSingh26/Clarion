import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title, messages = [] } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title: title || 'New Chat',
                messages: messages || [],
                lastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role, id, createdAt } = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = {
                    id: chatId,
                    title: 'New Chat',
                    messages: [],
                    lastUpdated: new Date().toISOString()
                }
            }
            if (!state.chats[chatId].messages) {
                state.chats[chatId].messages = []
            }
            state.chats[chatId].messages.push({
                _id: id || Date.now().toString(),
                content,
                role,
                createdAt: createdAt || new Date().toISOString()
            })
            state.chats[chatId].lastUpdated = new Date().toISOString()
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = {
                    id: chatId,
                    title: 'New Chat',
                    messages: [],
                    lastUpdated: new Date().toISOString()
                }
            }
            state.chats[chatId].messages = messages || []
        },
        setChats: (state, action) => {
            state.chats = action.payload || {}
        },
        removeChat: (state, action) => {
            const chatId = action.payload
            delete state.chats[chatId]
            if (state.currentChatId === chatId) {
                state.currentChatId = null
            }
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    createNewChat,
    addNewMessage,
    addMessages,
    removeChat
} = chatSlice.actions
export default chatSlice.reducer