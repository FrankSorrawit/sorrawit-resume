import React from 'react';
import { motion } from 'framer-motion';

interface LeadershipItem {
    title: string;
    description: string;
}

interface LeadershipProps {
    data: {
        title: string;
        items: LeadershipItem[];
        softSkills: string[];
    };
}

const Leadership: React.FC<LeadershipProps> = ({ data }) => {
    return (
        <section id="leadership" className="section">
            <div className="container">
                <h2 className="section-title">{data.title}</h2>

                <div className="leadership-grid">
                    {data.items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="leadership-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="leadership-title">{item.title}</h3>
                            <p className="leadership-desc">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="soft-skills-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="soft-skills-title">Professional Skills</h3>
                    <div className="soft-skills-list">
                        {data.softSkills.map((skill, index) => (
                            <motion.span
                                key={index}
                                className="soft-skill-tag"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Leadership;
