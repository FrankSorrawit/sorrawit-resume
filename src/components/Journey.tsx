import React from 'react';
import { motion } from 'framer-motion';

interface JourneyStep {
    step: string;
    detail: string;
    icon: string;
    year: string;
}

interface JourneyProps {
    data: JourneyStep[];
}

const Journey: React.FC<JourneyProps> = ({ data }) => {
    return (
        <section id="journey" className="section">
            <div className="container">
                <h2 className="section-title">Career Journey</h2>
                <div className="horizontal-timeline">
                    <div className="timeline-line"></div>
                    <div className="timeline-items">
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                className="timeline-node"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                            >
                                <div className="timeline-dot-h"></div>
                                <div className="timeline-card-h">
                                    <span className="timeline-icon-h">{item.icon}</span>
                                    <span className="timeline-year-h">{item.year}</span>
                                    <span className="timeline-step-h">{item.step}</span>
                                    <span className="timeline-detail-h">{item.detail}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
