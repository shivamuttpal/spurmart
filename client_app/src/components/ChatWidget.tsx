import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { cn } from '../lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    // Initialize session
    useEffect(() => {
        const initSession = async () => {
            try {
                const storedSession = localStorage.getItem('chatSessionId');
                if (storedSession) {
                    setSessionId(storedSession);
                    // Load history
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/history/${storedSession}`);
                    setMessages(res.data.history);
                } else {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/start`);
                    setSessionId(res.data.sessionId);
                    localStorage.setItem('chatSessionId', res.data.sessionId);
                }
            } catch (err) {
                console.error('Failed to init session', err);
            }
        };
        if (isOpen && !sessionId) {
            initSession();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || !sessionId) return;

        const tempId = Date.now().toString();
        const userMsg: Message = { id: tempId, role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/message`, {
                message: userMsg.content,
                sessionId
            });

            const aiMsg: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: res.data.reply
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error('Error sending message', err);
            const errorMsg: Message = { id: Date.now().toString(), role: 'assistant', content: "Sorry, something went wrong. Please try again." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[380px] h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3 text-white">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight">Spur AI</h3>
                                    <p className="text-blue-100 text-xs font-medium">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-blue-100 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950 relative">
                            {/* Decorative background element */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>

                            <MessageList messages={messages} isLoading={isLoading} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                            <InputArea
                                value={input}
                                onChange={setInput}
                                onSend={sendMessage}
                                disabled={isLoading || !sessionId}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
                    isOpen
                        ? "bg-slate-800 text-white rotate-0"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rotate-0"
                )}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ChatWidget;
