const insuranceService = require('../services/insuranceService');

const insuranceController = {
    async startChat(req, res) {
        try {
            const response = await insuranceService.startChat();
            res.json({ message: response });
        } catch (error) {
            console.error('Controller - Error starting chat:', error);
            res.status(500).json({ error: 'Failed to start chat' });
        }
    },

    async sendMessage(req, res) {
        try {
            const { messageHistory, userInput } = req.body;
            const response = await insuranceService.sendMessage(messageHistory, userInput);
            res.json({ message: response });
        } catch (error) {
            console.error('Controller - Error processing message:', error);
            res.status(500).json({ error: 'Failed to process message' });
        }
    }
};

module.exports = insuranceController;
