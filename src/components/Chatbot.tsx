import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, MessageSquare } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): string => {
    let html = text
        // Escape HTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Headers (### Header)
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        // Bold (**text**)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Unordered lists (* item or - item)
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Numbered lists (1. item)
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>');

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*?<\/li>)(\s*<br\/>)*(<li>)/g, '$1$3');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

    return `<p>${html}</p>`;
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'welcome', text: "Hi! 👋 I'm Frank's AI assistant. Looking to build AI solutions for your organization? Ask me about Frank's experience, projects, or how he can help your team! 🚀", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://sorrawit-chatbot-iqiapa2cqa-as.a.run.app/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    session_id: 'guest-session'
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div id="chatbot-widget" className={`chatbot-widget ${isOpen ? '' : 'collapsed'}`}>
            <div className="chatbot-header" onClick={!isOpen ? toggleChat : undefined}>
                <div className="chatbot-title">
                    <span className="status-dot"></span> Sorrawit.AI
                </div>
                <button id="chatbot-toggle" className="chatbot-toggle-btn" onClick={(e) => { e.stopPropagation(); toggleChat(); }}>
                    {isOpen ? <ChevronDown size={24} /> : <MessageSquare size={24} />}
                </button>
            </div>

            <div className="chatbot-body">
                <div id="chat-messages" className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            {msg.sender === 'bot' ? (
                                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message bot">Thinking...</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-area">
                    <input
                        type="text"
                        id="chat-input"
                        placeholder="Ask a question..."
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button id="chat-send" onClick={sendMessage}>
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
