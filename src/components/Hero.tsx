import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
    profile: {
        name: string;
        nickname: string;
        title: string;
        tagline: string;
        image: string;
        cvLink: string;
        company: string;
        period: string;
        location?: string;
    };
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
    const scrollToChat = () => {
        const chatWidget = document.getElementById('chatbot-widget');
        if (chatWidget) {
            chatWidget.classList.remove('collapsed');
        }
    };

    const scrollToNext = () => {
        const nextSection = document.getElementById('career-summary');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header id="hero" className="hero-section">
            <div className="hero-content">


                <motion.p
                    className="hero-greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    👋 Hi, I'm
                </motion.p>

                <motion.h1
                    className="name"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {profile.name} <span className="highlight">({profile.nickname})</span>
                </motion.h1>

                <motion.h2
                    className="title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {profile.title}
                </motion.h2>

                <motion.div
                    className="company-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    🏢 {profile.company} • {profile.period}
                </motion.div>

                <motion.p
                    className="tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    {profile.tagline}
                </motion.p>

                <motion.div
                    className="cta-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <a href={profile.cvLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        📄 Download CV
                    </a>
                    <button onClick={scrollToChat} className="btn btn-secondary">
                        💬 Chat with AI
                    </button>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    onClick={scrollToNext}
                >
                    <span>Scroll to explore</span>
                    <motion.div
                        className="scroll-arrow"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
