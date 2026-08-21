import axios from 'axios'

const api = axios.create({
    // Agar production hai toh base URL empty ("") rahega, nahi toh local backend ka URL use hoga
    baseURL: import.meta.env.PROD ? "" : "http://localhost:3000",
    withCredentials: true
})

export const sendMessage = async ({ message, chatId, webSearch = false }) => {
    const response = await api.post('/api/chat/message', { message, chatId, chat: chatId, webSearch })
    return response.data
}

export const getChats = async () => {
    const response = await api.get('/api/chat')
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chat/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chat/delete/${chatId}`)
    return response.data
}