const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const insuranceProducts = {
    MBI: {
        name: "Mechanical Breakdown Insurance (MBI)",
        description: "Covers repair costs for mechanical and electrical failures."
    },
    COMPREHENSIVE: {
        name: "Comprehensive Car Insurance",
        description: "Full coverage including accidents, theft, and damage to your vehicle and others."
    },
    THIRD_PARTY: {
        name: "Third Party Car Insurance",
        description: "Basic coverage for damage to other vehicles and property."
    }
};

class InsuranceService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        this.context = `You are Tina, an AI insurance consultant. Your role is to help users choose the right insurance policy.
        Remember these rules:
        1. MBI is not available for trucks and racing cars
        2. Comprehensive Car Insurance is only for vehicles less than 10 years old
        3. Ask relevant questions about the user's situation
        4. Don't ask directly what insurance they want
        5. Make a recommendation based on their answers
        
        Available products:
        ${JSON.stringify(insuranceProducts, null, 2)}
        
        Maintain a conversational, friendly tone. Start by introducing yourself and asking for permission to ask questions.`;
    }

    async startChat() {
        try {
            if (!process.env.GEMINI_API_KEY) {
                console.error('GEMINI_API_KEY is not set in environment variables');
                throw new Error('API key not configured');
            }

            console.log('Initializing chat with Gemini AI...');
            const prompt = `${this.context}\n\nStart the conversation by introducing yourself.`;
            const result = await this.model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error('Error in startChat:', error);
            throw error;
        }
    }

    async sendMessage(messageHistory, userInput) {
        try {
            // Format conversation history
            const conversationContext = messageHistory
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n');

            // Create prompt with context and history
            const prompt = `${this.context}\n\nConversation history:\n${conversationContext}\n\nUser: ${userInput}\nAssistant:`;

            const result = await this.model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to process message');
        }
    }
}

module.exports = new InsuranceService();
