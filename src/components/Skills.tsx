import React from 'react';
import { motion } from 'framer-motion';

interface SkillsProps {
    data: {
        [category: string]: string[];
    };
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="section-title">Skills Matrix</h2>
                <div className="skills-grid">
                    {Object.entries(data).map(([category, skills], index) => (
                        <motion.div
                            key={category}
                            className="skill-category"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
                            <div className="skill-items">
                                {skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
