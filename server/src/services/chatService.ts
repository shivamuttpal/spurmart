import { prisma } from '../index';

export async function createConversation() {
    return await prisma.conversation.create({
        data: {},
    });
}

export async function addMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
    return await prisma.message.create({
        data: {
            conversationId,
            role,
            content,
        },
    });
}

export async function getConversationHistory(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' },
            },
        },
    });

    return conversation?.messages || [];
}
