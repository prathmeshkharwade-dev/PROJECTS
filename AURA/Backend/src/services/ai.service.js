import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


export async function testAi() {
    try {
        const response = await model.invoke("Whai is ai explain under 100 words?");
        console.log(response.text);
    } catch (error) {
        console.error("Error in testAi:", error);
    }
}