import { generateResponse, generateChatTitle } from "../service/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessage(req, res) {
    const chatId = req.body.chatId || req.body.chat;
    const { message } = req.body;

    let title = null, chat = null

    if (!chatId) {
        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title,
        })
    }
    const currentChatId = chatId || chat._id;

    const userMessage = await messageModel.create({
        chat: currentChatId,
        content: message,
        role: 'user'
    })

    const messages = await messageModel.find({ chat: currentChatId })
    const result = await generateResponse(messages)
    const aiMessage = await messageModel.create({
        chat: currentChatId,
        content: result,
        role: 'ai'
    })

    console.log(messages)

    res.status(201).json({
        title: title,
        chat: chat || { _id: currentChatId },
        aiMessage
    })
}

export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: 'Chats received successfully',
        chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })
    if (!chat) {
        return res.status(404).json({
            message: 'Chats not Found',
        })
    }
    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: 'Chat not Found'
        })
    }
    res.status(200).json({
        message: "Chat deleted Successfully"
    })
}