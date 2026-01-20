import React from 'react';
import { motion } from 'framer-motion';

interface Competency {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
}

interface CoreCompetenciesProps {
    data: Competency[];
}

const CoreCompetencies: React.FC<CoreCompetenciesProps> = ({ data }) => {
    return (
        <section id="competencies" className="section">
            <div className="container">
                <h2 className="section-title">Core Competencies</h2>
                <div className="competencies-grid">
                    {data.map((competency, index) => (
                        <motion.div
                            key={index}
                            className="competency-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <div className="competency-icon">{competency.icon}</div>
                            <div className="competency-content">
                                <h3 className="competency-title">{competency.title}</h3>
                                <span className="competency-subtitle">{competency.subtitle}</span>
                                <p className="competency-description">{competency.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreCompetencies;
