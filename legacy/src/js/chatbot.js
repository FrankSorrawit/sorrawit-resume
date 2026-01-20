import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('chatbot-widget');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const heroChatBtn = document.getElementById('hero-chat-btn');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesContainer = document.getElementById('chat-messages');

    // Toggle Chatbot
    function toggleChat() {
        widget.classList.toggle('collapsed');
        if (!widget.classList.contains('collapsed')) {
            input.focus();
        }
    }

    toggleBtn.addEventListener('click', toggleChat);

    if (heroChatBtn) {
        heroChatBtn.addEventListener('click', () => {
            if (widget.classList.contains('collapsed')) {
                toggleChat();
            }
            input.focus();
        });
    }

    // Send Message
    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add User Message
        addMessage(message, 'user');
        input.value = '';

        // Add Loading Indicator
        const loadingId = addLoading();

        try {
            const response = await fetch('http://localhost:9743/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    session_id: 'guest-session' // Simple session ID for now
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            removeLoading(loadingId);
            addMessage(data.reply, 'bot');

        } catch (error) {
            console.error('Error:', error);
            removeLoading(loadingId);
            addMessage("Sorry, I'm having trouble connecting to my brain right now. Please try again later.", 'bot');
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addLoading() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message bot';
        div.textContent = 'Thinking...';
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return id;
    }

    function removeLoading(id) {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }
});
