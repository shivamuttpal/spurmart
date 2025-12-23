import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// The client gets the API key from the environment variable GEMINI_API_KEY
const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `You are a helpful customer support agent for "Spur Mart", an e-commerce store.
You are professional, concise, and friendly.
Your goal is to answer user questions based on general e-commerce knowledge and the following specific policies:

- Shipping: We ship to USA, Canada, and UK. Free shipping on orders over $50. Standard shipping takes 3-5 business days.
- Returns: 30-day return policy for unused items in original packaging. Customer pays return shipping unless item is defective.
- Support Hours: Mon-Fri 9AM - 5PM EST.
- Contact: support@spurmart.com

If you don't know the answer, politely ask the user to contact support.
Do not invent policies that are not listed here.
`;

export async function generateReply(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
    try {
        // Filter out system messages from history as we pass it as systemInstruction
        // Map 'assistant' role to 'model' for Gemini
        const history = messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

        const result = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: history,
            config: {
                systemInstruction: SYSTEM_PROMPT
            }
        });

        // Check if there is a text method or just return result stringified if not sure yet, 
        // but typically result.text() is the way.
        // If result IS the response, then result.text() should exist.
        return result.text ? result.text : JSON.stringify(result);
    } catch (error) {
        console.error('Error calling Gemini:', error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
}
