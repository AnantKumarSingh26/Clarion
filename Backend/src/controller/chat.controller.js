import { generateResponse, generateChatTitle } from "../service/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body;

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
        chat: chatId || chat._id,
        content: message,
        role: 'user'
    })

    const messages = await messageModel.find({ chat: currentChatId })
    const result = await generateResponse(messages)
    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: 'ai'
    })

    console.log(messages)

    res.status(201).json({
        title: title,
        chat,
        aiMessage
    })
}

