import React from 'react';
import { motion } from 'framer-motion';

interface TeachingProps {
    data: {
        title: string;
        description: string;
        topics: string[];
    };
}

const Teaching: React.FC<TeachingProps> = ({ data }) => {
    return (
        <section id="teaching" className="section">
            <div className="container">
                <h2 className="section-title">{data.title}</h2>
                <motion.div
                    className="teaching-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.1rem',
                        marginBottom: '1.5rem'
                    }}>
                        {data.description}
                    </p>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                        📚 Seminar Topics
                    </h3>
                    <div className="teaching-topics">
                        {data.topics.map((topic, index) => (
                            <motion.div
                                key={index}
                                className="teaching-topic"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                            >
                                {topic}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Teaching;
