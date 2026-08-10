import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  apiKey: process.env.GOOGLE_API_KEY
});
export async function testAi() {

    try{const question = "What is the capital of India"
        console.log(question)
        const response = await model.invoke(question);
        console.log(response.content)
    }catch(err){
        console.error("AI Error:", err.message)
    }
}