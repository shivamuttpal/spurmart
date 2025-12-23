import { Router } from 'express';
import { createConversation, addMessage, getConversationHistory } from './services/chatService';
import { generateReply } from './services/llmService';

const router = Router();

// Start a new conversation
router.post('/chat/start', async (req, res) => {
    try {
        const conversation = await createConversation();
        res.json({ sessionId: conversation.id });
    } catch (error) {
        console.error('Error starting chat:', error);
        res.status(500).json({ error: 'Failed to start conversation' });
    }
});

// Send a message and get a reply
router.post('/chat/message', async (req, res) => {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
        return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    try {
        // 1. Save user message
        await addMessage(sessionId, 'user', message);

        // 2. Get history for context
        const history = await getConversationHistory(sessionId);

        // 3. Generate AI reply
        // Convert history to format expected by LLM service
        const llmHistory = history.map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }));

        const replyText = await generateReply(llmHistory);

        // 4. Save AI reply
        const aiMessage = await addMessage(sessionId, 'assistant', replyText);

        res.json({ reply: replyText, sessionId });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
});

// Get conversation history
router.get('/chat/history/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const history = await getConversationHistory(sessionId);
        res.json({ history });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

export default router;
