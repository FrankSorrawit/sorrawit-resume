import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, FileText, MapPin, Phone } from 'lucide-react';

interface ContactProps {
    data: {
        email: string;
        phone?: string;
        linkedin: string;
        paper?: string;
        location?: string;
    };
}

const Contact: React.FC<ContactProps> = ({ data }) => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <motion.p
                    className="contact-intro"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Looking to build AI solutions for your organization? Let's connect!
                </motion.p>

                <div className="contact-links">
                    <motion.a
                        href={`mailto:${data.email}`}
                        className="contact-link"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Mail size={20} />
                        <span>{data.email}</span>
                    </motion.a>

                    {data.phone && (
                        <motion.a
                            href={`tel:${data.phone}`}
                            className="contact-link"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Phone size={20} />
                            <span>{data.phone}</span>
                        </motion.a>
                    )}

                    <motion.a
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                    </motion.a>

                    {data.paper && (
                        <motion.a
                            href={data.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FileText size={20} />
                            <span>Research Paper</span>
                        </motion.a>
                    )}

                    {data.location && (
                        <motion.div
                            className="contact-link contact-location"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                        >
                            <MapPin size={20} />
                            <span>{data.location}</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
