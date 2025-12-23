import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Bot, User } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="h-full overflow-y-auto p-4 space-y-6 scroll-smooth">
            {messages.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-3 p-8"
                >
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-2">
                        <Bot size={32} className="text-blue-500" />
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
                        Welcome to Spur Support!
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px]">
                        Ask me anything about our products, or just say hello!
                    </p>
                </motion.div>
            )}

            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "flex w-full",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "flex items-end gap-2 max-w-[85%]",
                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}>
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                msg.role === 'user'
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                                    : "bg-white dark:bg-slate-800 text-blue-600 border border-slate-200 dark:border-slate-700"
                            )}>
                                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            <div
                                className={cn(
                                    "px-4 py-3 text-sm shadow-md rounded-2xl",
                                    msg.role === 'user'
                                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-sm"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start w-full"
                >
                    <div className="flex items-end gap-2">
                        <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                            <Bot size={14} className="text-blue-600" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <div ref={endRef} />
        </div>
    );
};

export default MessageList;
