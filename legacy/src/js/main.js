import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    populateHero();
    populateAbout();
    populateExperience();
    populateProjects();
    populateTeaching();
    populateSkills();
    populateJourney();
    populateContact();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

function populateHero() {
    // document.querySelector('.profile-img').src = resumeData.profile.image;
    // document.querySelector('.name').innerHTML = `${resumeData.profile.name.split('(')[0]} <span class="highlight">(${resumeData.profile.name.split('(')[1]}</span>`;
    // Using simple text replacement for now to match HTML structure
    // document.querySelector('.title').textContent = resumeData.profile.title;
    // document.querySelector('.tagline').textContent = resumeData.profile.tagline;
    document.querySelector('.btn-primary').href = resumeData.profile.cvLink;
}

function populateAbout() {
    document.getElementById('about-story').textContent = resumeData.about.story;
    const strengthsList = document.getElementById('about-strengths');
    resumeData.about.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });
}

function populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    resumeData.experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-year">${exp.year}</span>
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

function populateProjects() {
    const grid = document.getElementById('projects-grid');
    resumeData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-img" style="background-image: url('${project.image}'); background-size: cover; background-position: center;"></div>
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function populateTeaching() {
    const list = document.getElementById('teaching-list');
    resumeData.teaching.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = `• ${topic}`;
        li.style.marginBottom = '0.5rem';
        list.appendChild(li);
    });
}

function populateSkills() {
    const grid = document.getElementById('skills-grid');
    for (const [category, skills] of Object.entries(resumeData.skills)) {
        const catDiv = document.createElement('div');
        catDiv.className = 'skill-category';
        catDiv.innerHTML = `
            <h3>${category.toUpperCase()}</h3>
            <div class="skill-items">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        grid.appendChild(catDiv);
    }
}

function populateJourney() {
    const grid = document.getElementById('journey-grid');
    resumeData.journey.forEach((step, index) => {
        const div = document.createElement('div');
        div.className = 'journey-step';
        div.textContent = `${index + 1}. ${step}`;
        grid.appendChild(div);
    });
}

function populateContact() {
    const links = document.getElementById('contact-links');
    const contact = resumeData.contact;

    links.innerHTML = `
        <a href="mailto:${contact.email}" class="contact-link">Email</a>
        <a href="${contact.linkedin}" target="_blank" class="contact-link">LinkedIn</a>
        <a href="${contact.github}" target="_blank" class="contact-link">GitHub</a>
    `;
}
