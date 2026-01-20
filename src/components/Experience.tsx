import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
    year: string;
    role: string;
    company: string;
    description: string;
    highlights?: string[];
}

interface ExperienceProps {
    data: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="timeline">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <span className="timeline-year">{item.year}</span>
                                <h3>{item.role}</h3>
                                <h4>{item.company}</h4>
                                <p>{item.description}</p>
                                {item.highlights && item.highlights.length > 0 && (
                                    <ul style={{
                                        marginTop: '0.8rem',
                                        paddingLeft: '1rem',
                                        listStyle: 'none'
                                    }}>
                                        {item.highlights.map((highlight, idx) => (
                                            <li key={idx} style={{
                                                fontSize: '0.85rem',
                                                color: '#A78BFA',
                                                marginBottom: '0.3rem'
                                            }}>
                                                → {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
