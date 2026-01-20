export const resumeData = {
    profile: {
        name: "Sorrawit Treesuk",
        nickname: "Frank",
        title: "AI Developer | GenAI Solution Architect",
        tagline: "Building production-grade Chatbot and GenAI/LLM solutions at enterprise scale. \n\nFrom On-field Engineer to AI Engineer.",
        image: "images/profile.jpg",
        cvLink: "/Sorrawit_Resume_2026.pdf",
        company: "AXONS (CP Group)",
        period: "2023 – Present",
        location: "Bangkok, Thailand"
    },
    careerSummary: {
        headline: "3+ Years of Enterprise AI",
        stats: [
            { value: "3+", label: "Years", sublabel: "Experience" },
            { value: "10", label: "Chatbots", sublabel: "Deployed" },
            { value: "75%", label: "Dev Time", sublabel: "Reduction" },
            { value: "100M+", label: "THB", sublabel: "Impact" }
        ],
        description: "AI Developer building production-grade GenAI solutions. Specialized in LLM platforms, Multi-agent systems, and AIOps. Published researcher with proven business impact.",
        highlights: [
            "Published Researcher (arXiv)",
            "From EE to AI Lead in 3 Years",
            "Enterprise Scale Solutions"
        ]
    },
    coreCompetencies: [
        {
            icon: "🏗️",
            title: "Solution Design",
            subtitle: "& System Thinking",
            description: "End-to-end system architecture from Ingest → Retrieval → Agent → Gateway → Deployment"
        },
        {
            icon: "🤖",
            title: "GenAI Engineering",
            subtitle: "Production-Ready",
            description: "Multi-agent flows, RAG optimization, Guardrails, Fallback mechanisms, LLM Gateway design"
        },
        {
            icon: "⚙️",
            title: "DevOps & AIOps",
            subtitle: "Automated Testing",
            description: "Automated Evaluation (LLM-as-Judge), Security/Auth integration, AI model pipelines"
        },
        {
            icon: "👥",
            title: "Team Lead",
            subtitle: "& Mentorship",
            description: "Mentoring junior developers, defining standards, managing transition from POC to Production"
        }
    ],
    about: {
        story: `AI Developer with 3+ years of experience building production-grade GenAI solutions at enterprise scale. 

Specialized in LLM platforms, Multi-agent systems, and AIOps — achieving 75% reduction in development time and deploying 7 domain-specific chatbots in one year.

Published researcher (arXiv) with proven business impact of 100M+ THB annually. Experienced in transitioning from individual contributor to team lead, designing scalable architectures for junior teams to implement.`,
        strengths: [
            "Multi-Agent Systems",
            "Advanced RAG",
            "LLM Gateways",
            "System Architecture",
            "Prompt Engineering",
            "Team Leadership",
            "GCP & Azure",
            "Python & FastAPI"
        ]
    },
    experience: [
        {
            year: "2023 – Present",
            role: "AI Developer (Senior / Team Lead)",
            company: "AXONS (CPF IT Center)",
            description: "Transitioned to Senior role focusing on Solution Architecture, AIOps, and Security. Guiding junior developers in delivering production-grade systems.",
            highlights: [
                "Architected centralized LLM Platform (OpenWebUI + Cloud Run)",
                "Designed Zero-Code chatbot pipeline",
                "Deployed 7 domain chatbots in one year",
                "Reduced dev effort from 4 devs/3mo to 1 dev/3mo"
            ]
        },
        {
            year: "2020 – 2023",
            role: "Electrical Engineer",
            company: "Panasonic SPT",
            description: "Managed PLC programming, maintenance, and process optimization for production lines.",
            highlights: [
                "PLC programming & automation",
                "Solved critical production issues under pressure",
                "Ensured minimal downtime"
            ]
        },
        {
            year: "2018 – 2020",
            role: "Maintenance Engineer",
            company: "Belton",
            description: "Conducted preventive maintenance and root cause analysis for machinery and operational systems.",
            highlights: [
                "Preventive maintenance systems",
                "Root cause analysis",
                "Operational optimization"
            ]
        }
    ],
    education: {
        degree: "Bachelor's Degree in Electrical Engineering",
        university: "Kasetsart University",
        year: "2017"
    },
    projects: [
        {
            name: "MooD: When Pigs Get Sick",
            type: "Production / Multi-Agent System",
            description: "Production Multi-Agent AI system for livestock disease diagnosis. Uses Mixture of Experts (MoE) with specialized agents debating symptoms like real veterinarians. Published on arXiv.",
            problem: "Misdiagnosis in livestock farming using visual-only diagnosis",
            solution: "LangGraph-based workflow with Diagnostician + Critic agents and Dual-Store RAG (Disease vs Drug data)",
            impact: "Diagnostic accuracy equivalent to professional vets. Estimated ~100M THB/year business impact.",
            tech: ["LangGraph", "Multi-Agent", "RAG", "Vision AI", "Vertex AI"],
            paper: "arXiv:2503.15204",
            icon: "🐷",
            featured: true
        },
        {
            name: "GenAI Platform & OpenWebUI",
            type: "Infrastructure / Platform",
            description: "Enterprise-grade AI platform with customized OpenWebUI frontend and Cloud Run backend for organization-wide AI access.",
            problem: "Business users needed AI but lacked internal apps; existing tools couldn't display source images",
            solution: "OpenWebUI + Dynamic System Prompt Injection + Source Image Retrieval (Images from Documents)",
            impact: "Democratized AI access for non-technical users. Provided secure API layer for organization.",
            tech: ["FastAPI", "LangGraph", "OpenWebUI", "Cloud Run", "OAuth"],
            icon: "🚀",
            featured: true
        },
        {
            name: "Corporate Chatbot Framework",
            type: "Automation / RAG Pipeline",
            description: "Zero-code pipeline where users upload docs to SharePoint, and chatbots are automatically built with specialized Thai OCR.",
            problem: "High demand for chatbots across departments with limited dev resources",
            solution: "Self-Service Pipeline: SharePoint upload → Auto OCR → Vectorization → Prompt Optimization",
            impact: "75% reduction in man-hours. 7 domain chatbots deployed in 1 year.",
            tech: ["Cloud Functions", "Vertex AI", "Thai OCR", "LLM-as-Judge"],
            icon: "🤖",
            featured: true
        },
        {
            name: "Shrimp Price Prediction",
            type: "ML / Time Series",
            description: "LightGBM forecasting system integrating internal ERP data with external signals for procurement planning.",
            problem: "Procurement relied on intuition for long-term planning",
            solution: "LightGBM model with feed costs, weather, market indices, exchange rates",
            impact: "<10% MAPE on 6-month forecast. PowerBI Dashboard for procurement team.",
            tech: ["LightGBM", "Feature Engineering", "PowerBI", "Time Series"],
            icon: "🦐",
            featured: true
        }
    ],
    otherProjects: [
        {
            name: "Legal Chatbot",
            type: "Legal AI / RAG",
            description: "AI Legal Assistant specialized in Thai Law with RAG capabilities for case research.",
            specialty: "Thai Government Documents, Thai Language NLP, Country-specific Legal Data",
            tech: ["RAG", "Thai NLP", "FastAPI", "LangChain"],
            icon: "⚖️"
        },
        {
            name: "Enterprise Chatbot Suite",
            type: "Domain Chatbots",
            description: "Multiple production chatbots deployed across business domains including Engineering, HR, Sales, and FAQ systems.",
            specialty: "Part of the many domain-specific chatbots, working with domain experts to make them production-grade",
            tech: ["Vertex AI", "RAG", "LLM-as-Judge", "SharePoint Integration"],
            icon: "💬"
        }
    ],
    teaching: {
        title: "AI & LLM Training",
        description: "Conducted weekly knowledge-sharing sessions and external seminars on cutting-edge GenAI techniques.",
        topics: [
            "Introduction to Large Language Models",
            "Building Production RAG Applications",
            "Advanced Prompt Engineering",
            "From RAG to Agentic RAG",
            "Multi-Agent System Design",
            "LLM-as-a-Judge Evaluation",
            "AI Security & Responsible AI"
        ]
    },
    skills: {
        "🤖 GenAI & LLM": ["Multi-Agent (LangGraph)", "Advanced RAG", "Prompt Engineering", "LLM Gateways", "Guardrails"],
        "☁️ Cloud & DevOps": ["GCP (Vertex AI, Cloud Run)", "Azure OpenAI", "Docker", "CI/CD", "AIOps"],
        "💻 Backend & Data": ["Python", "FastAPI", "Microservices", "API Security", "Vector DBs"],
        "📊 ML & Analytics": ["LightGBM", "Scikit-learn", "Pandas", "MLflow", "PowerBI"]
    },
    journey: [
        { step: "Kasetsart University", detail: "EE Degree", icon: "🎓", year: "2017" },
        { step: "Belton", detail: "Maintenance Engineer", icon: "🔧", year: "2018-2020" },
        { step: "Panasonic SPT", detail: "Electrical Engineer", icon: "⚡", year: "2020-2023" },
        { step: "AXONS", detail: "AI Developer", icon: "🤖", year: "2023" },
        { step: "AXONS", detail: "Team Lead", icon: "👨‍💼", year: "2025+" }
    ],
    leadership: {
        title: "Leadership & Soft Skills",
        items: [
            {
                title: "Cross-functional Leadership",
                description: "Led developer teams delivering solutions across business domains"
            },
            {
                title: "Mentorship",
                description: "Mentored junior developers on implementation and timeline management"
            },
            {
                title: "AI Consulting",
                description: "Internal consultant advising on architecture design and model selection"
            },
            {
                title: "Business Translation",
                description: "Collaborated with non-technical stakeholders to translate needs into solutions"
            }
        ],
        softSkills: ["Problem Solving", "Critical Thinking", "Agile", "Communication", "Work Under Pressure"]
    },
    contact: {
        email: "sorrawit.tre@gmail.com",
        phone: "0867107908",
        linkedin: "https://linkedin.com/in/sorrawit-treesuk-20021a195/",
        paper: "https://arxiv.org/abs/2503.15204",
        location: "Bangkok, Thailand"
    }
};
