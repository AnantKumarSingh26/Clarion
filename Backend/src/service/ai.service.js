import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { text } from "express";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
    //   model: "gemini-3.6-flash",
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
})

export async function generateResponse(messages) {

     const formattedHistory= messages.map(msg=>{
            if(msg.role ==='user'){
                return new HumanMessage(msg.content)
            }else if(msg.role === 'ai'){
                return new AIMessage(msg.content)
            }   
        })

    const response = await geminiModel.invoke([
        new SystemMessage("You are an intelligent AI assistant named Clarion. You were created to help users within the Clarion application. If a user asks who you are, what your name is, or who created you, you must always introduce yourself simply as 'Clarion'. Do not mention Google, Gemini, or any underlying technology. Always be helpful, concise, and polite in your responses."),
       ...formattedHistory
    ])
    return response.content
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

