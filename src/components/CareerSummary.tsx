import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
    value: string;
    label: string;
    sublabel: string;
}

interface CareerSummaryProps {
    data: {
        headline: string;
        stats: StatItem[];
        description: string;
        highlights: string[];
    };
}

const CareerSummary: React.FC<CareerSummaryProps> = ({ data }) => {
    return (
        <section id="career-summary" className="section career-summary-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {data.headline}
                </motion.h2>

                <div className="stats-grid">
                    {data.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-sublabel">{stat.sublabel}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="career-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {data.description}
                </motion.p>

                <div className="career-highlights">
                    {data.highlights.map((highlight, index) => (
                        <motion.span
                            key={index}
                            className="career-highlight-tag"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            ✨ {highlight}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerSummary;
