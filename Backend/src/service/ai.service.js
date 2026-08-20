import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { text } from "express";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import * as z from 'zod'
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
    //   model: "gemini-3.6-flash",
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
})

const searchInternetTool = tool(
    searchInternet, {
    name: 'searchInternet',
    description: `ONLY use this tool when you need live, real-time, or current information
  (such as today's news, latest events, current prices, or events after your knowledge cutoff). 
        DO NOT use this tool for coding, math, general science, language translations, or
  established historical facts.`,
    schema: z.object({
        query: z.string().describe('The specific search query')
    })
})

const agent = createAgent({
    model: geminiModel,
    tools: [searchInternetTool]
})

export async function generateResponse(messages, webSearch = false) {

    const formattedHistory = messages
        .filter(msg => msg && msg.content)
        .map(msg => {
            if (msg.role === 'user') {
                return new HumanMessage(msg.content)
            } else if (msg.role === 'ai') {
                return new AIMessage(msg.content)
            }
        })

    const systemPrompt = new SystemMessage(`You are an intelligent AI assistant named
  **Clarion** created by **Anant** 💕. You help users with coding, general queries, and live web
  research.
    
    CRITICAL RULES:
    1. Answer the user's question directly, accurately, and concisely.
    2. DO NOT include any signatures, footers, creator details, LinkedIn links, or email links in
  normal responses (e.g. live scores, coding, general questions, news).
    3. ONLY if the user specifically and explicitly asks "Who created you?", "Who made you?", or
  asks for developer/creator contact details, you can share:
       - Creator: Anant
       - LinkedIn: https://www.linkedin.com/in/anantkumarsingh-code
       - Email: anantsingh.code@gmail.com
    4. Do not mention Google, Gemini, or the underlying technology.`);

    if (webSearch) {
        const response = await agent.invoke({
            messages: [systemPrompt, ...formattedHistory]
        });
        const lastMessage = response.messages[response.messages.length - 1];
        return lastMessage.content || lastMessage.text;
    } else {
        const response = await geminiModel.invoke([systemPrompt, ...formattedHistory]);
        return response.content || response.text;
    }
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`You are an internal AI microservice for the Clarion application. Your ONLY job is to analyze the user's first message and generate a short, highly relevant, and catchy title for the chat history. 

        Rules:
            1. The title must be between 2 to 3 words.
            2. DO NOT answer the user's question or provide any conversational text.
            3. Output ONLY the title text and absolutely nothing else.`),
        new HumanMessage(
            `Generate a title for a chat conversation base on the following first message: ${message}`
        )
    ])
    return response.text
}
// export async function testAi() {

//     try{const question = "What is your name"
//         console.log(question)
//         const response = await model.invoke(question);
//         console.log(response.content)
//     }catch(err){
//         console.error("AI Error:", err.message)
//     }
// }


// ?export async function sendEmail(to, subject,html,text) {
// ?}

