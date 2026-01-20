import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectItem {
    name: string;
    type: string;
    description: string;
    problem?: string;
    solution?: string;
    impact: string;
    tech: string[];
    icon: string;
    paper?: string;
    featured?: boolean;
}

interface OtherProject {
    name: string;
    type: string;
    description: string;
    specialty?: string;
    tech: string[];
    icon: string;
}

interface ProjectsProps {
    data: ProjectItem[];
    otherProjects?: OtherProject[];
}

const Projects: React.FC<ProjectsProps> = ({ data, otherProjects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
    }, [data.length]);

    const prevProject = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, [data.length]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') prevProject();
        if (e.key === 'ArrowRight') nextProject();
    }, [prevProject, nextProject]);

    const currentProject = data[currentIndex];

    return (
        <section id="projects" className="section" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className="project-carousel">
                    <button className="carousel-btn carousel-btn-left" onClick={prevProject} aria-label="Previous project">
                        <ChevronLeft size={32} />
                    </button>

                    <div className="carousel-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className="project-slide"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="project-slide-header">
                                    <span className="project-slide-icon">{currentProject.icon}</span>
                                    <div className="project-slide-titles">
                                        <span className="project-slide-type">{currentProject.type}</span>
                                        <h3 className="project-slide-name">{currentProject.name}</h3>
                                    </div>
                                    {currentProject.paper && (
                                        <a
                                            href={`https://arxiv.org/abs/${currentProject.paper.replace('arXiv:', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-paper-badge"
                                        >
                                            📄 {currentProject.paper}
                                        </a>
                                    )}
                                </div>

                                <div className="project-slide-body">
                                    <div className="project-slide-main">
                                        <p className="project-slide-desc">{currentProject.description}</p>

                                        {currentProject.problem && (
                                            <div className="project-detail-block">
                                                <span className="project-detail-label">🔍 Problem</span>
                                                <p>{currentProject.problem}</p>
                                            </div>
                                        )}

                                        {currentProject.solution && (
                                            <div className="project-detail-block">
                                                <span className="project-detail-label">💡 Solution</span>
                                                <p>{currentProject.solution}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="project-slide-sidebar">
                                        <div className="project-impact-box">
                                            <span className="project-impact-label">📈 Impact</span>
                                            <p>{currentProject.impact}</p>
                                        </div>

                                        <div className="project-tech-box">
                                            <span className="project-tech-label">🛠️ Tech Stack</span>
                                            <div className="project-tech-tags">
                                                {currentProject.tech.map((tech, idx) => (
                                                    <span key={idx} className="tech-tag">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="carousel-btn carousel-btn-right" onClick={nextProject} aria-label="Next project">
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Progress dots */}
                <div className="carousel-dots">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Other Projects */}
                {otherProjects && otherProjects.length > 0 && (
                    <div className="other-projects">
                        <h3 className="other-projects-title">Other Projects</h3>
                        <div className="other-projects-grid">
                            {otherProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="other-project-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="other-project-icon">{project.icon}</span>
                                    <div className="other-project-info">
                                        <h4>{project.name}</h4>
                                        <span className="other-project-type">{project.type}</span>
                                        <p>{project.description}</p>
                                        {project.specialty && (
                                            <p className="other-project-specialty">
                                                🎯 Specialty: {project.specialty}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
