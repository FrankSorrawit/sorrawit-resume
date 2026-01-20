import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
    data: {
        story: string;
        strengths: string[];
    };
}

const About: React.FC<AboutProps> = ({ data }) => {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="about-text">
                        <p id="about-story" style={{ whiteSpace: 'pre-line' }}>{data.story}</p>

                        <h3>💪 Core Strengths</h3>
                        <ul className="strengths-list">
                            {data.strengths.map((strength, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    {strength}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
