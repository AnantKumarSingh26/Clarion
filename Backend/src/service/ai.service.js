import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
//   model: "gemini-3.6-flash",
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});
export async function testAi() {

    try{const question = "What is your name"
        console.log(question)
        const response = await model.invoke(question);
        console.log(response.content)
    }catch(err){
        console.error("AI Error:", err.message)
    }
}
export async function sendEmail(to, subject,html,text) {
    
}