import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputAreaProps {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
    disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onSend, disabled }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="relative flex items-center gap-2">
            <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Sparkles size={16} />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something..."
                    disabled={disabled}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>

            <button
                onClick={onSend}
                disabled={disabled || !value.trim()}
                className={cn(
                    "p-3 rounded-xl transition-all duration-200 shadow-sm flex-shrink-0",
                    !value.trim() || disabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:shadow-md hover:scale-105 active:scale-95"
                )}
            >
                <Send size={18} className={cn(value.trim() && !disabled && "-ml-0.5 mt-0.5")} />
            </button>
        </div>
    );
};

export default InputArea;
