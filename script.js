// ==================== PARTICLE ANIMATION ====================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const particles = [];
const particleCount = prefersReducedMotion ? 0 : 22;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.35 + 0.15;
        this.color = Math.random() > 0.5 ? '#7CFF00' : '#39FF14';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.opacity = Math.max(0.2, this.opacity - 0.001);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.opacity <= 0.2) {
            particles.splice(index, 1);
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

if (!prefersReducedMotion) {
    initParticles();
    animateParticles();
}

// ==================== HERO MOUSE PARALLAX ====================

const heroSection = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (heroSection && heroVisual && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    // The entrance animation's fill-mode would override inline transforms,
    // so drop it once it finishes.
    heroVisual.addEventListener('animationend', () => {
        heroVisual.style.animation = 'none';
    }, { once: true });

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let parallaxRunning = false;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

        if (!parallaxRunning) {
            parallaxRunning = true;
            requestAnimationFrame(updateParallax);
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function updateParallax() {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        heroVisual.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;

        if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05 && targetX === 0 && targetY === 0) {
            heroVisual.style.transform = '';
            parallaxRunning = false;
        } else {
            requestAnimationFrame(updateParallax);
        }
    }
}

// ==================== HAMBURGER MENU ====================

const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================

document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== COUNTER ANIMATION ====================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

function animateCounter(element) {
    const targetNumber = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = targetNumber / (duration / 50);
    let currentNumber = 0;

    const counterInterval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.textContent = targetNumber;
            clearInterval(counterInterval);
        } else {
            element.textContent = Math.floor(currentNumber);
        }
    }, 50);
}

document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// ==================== TESTIMONIALS CAROUSEL ====================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 8000);

// ==================== FAQ ACCORDION ====================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Keyboard accessibility
document.querySelectorAll('.faq-question').forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextQuestion = faqItems[index + 1];
            if (nextQuestion) {
                nextQuestion.querySelector('.faq-question').focus();
            }
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevQuestion = faqItems[index - 1];
            if (prevQuestion) {
                prevQuestion.querySelector('.faq-question').focus();
            }
        }
    });
});

// ==================== FORM VALIDATION ====================

// ==================== SERVICES ACCORDION ====================

const svcServices = [
    { title: "Business Websites", sub: "Build your digital foundation.", key: "browser" },
    { title: "Website Redesign", sub: "Give your site a fresh start.", key: "split" },
    { title: "UI/UX Design", sub: "Design it right, the first time.", key: "canvas" },
    { title: "AI Chatbot Integration", sub: "Let your site talk back.", key: "chat" },
    { title: "Social Media Content", sub: "Content that keeps them scrolling.", key: "phone" },
    { title: "API Integration", sub: "Connect the tools you already use.", key: "nodes" }
];

function svcVisualFor(key) {
    if (key === "browser") return `
        <div class="svc-mock browser">
            <div class="svc-mock-bar">
                <span class="svc-mock-dot"></span><span class="svc-mock-dot"></span><span class="svc-mock-dot"></span>
                <span class="svc-mock-url">yourbusiness.in</span>
            </div>
            <div class="svc-mock-body">
                <div class="svc-mock-nav"><span></span><span></span><span></span></div>
                <div class="svc-line lg"></div>
                <div class="svc-line md"></div>
                <div class="svc-mock-btn" style="margin: 12px 0 18px;"></div>
                <div class="svc-mock-cardrow"><div class="svc-mock-card"></div><div class="svc-mock-card"></div><div class="svc-mock-card"></div></div>
            </div>
        </div>`;
    if (key === "split") return `
        <div class="svc-mock split">
            <div class="svc-mock-half old">
                <span class="svc-mock-tag">before</span>
                <div class="svc-line lg dim"></div>
                <div class="svc-line md dim"></div>
                <div class="svc-line sm dim"></div>
            </div>
            <div class="svc-mock-divider"></div>
            <div class="svc-mock-half new">
                <span class="svc-mock-tag accent">after</span>
                <div class="svc-line lg"></div>
                <div class="svc-line md"></div>
                <div class="svc-mock-btn"></div>
            </div>
        </div>`;
    if (key === "canvas") return `
        <div class="svc-mock canvas">
            <div class="svc-artboard">
                <span class="svc-label">home · v1</span>
                <div class="svc-line xs" style="margin-bottom:7px;"></div><div class="svc-line xs" style="margin-bottom:7px;"></div><div class="svc-line xs"></div>
            </div>
            <span class="svc-canvas-arrow">&#8594;</span>
            <div class="svc-artboard">
                <span class="svc-label">home · v2</span>
                <div class="svc-line xs" style="margin-bottom:7px;"></div><div class="svc-line xs"></div>
                <div class="svc-cursor"><span>S</span></div>
            </div>
        </div>`;
    if (key === "chat") return `
        <div class="svc-mock chat">
            <div class="svc-chat-head"><span class="svc-chat-dot"></span>Primus Assistant · online</div>
            <div class="svc-chat-body">
                <div class="svc-bubble bot">Hey! What can I help with today?</div>
                <div class="svc-bubble user">Do you build websites?</div>
                <div class="svc-bubble bot">Yep — want a quick quote?</div>
            </div>
            <div class="svc-chat-input"><span>Type a message…</span><span style="color:var(--primary-green);">&#10148;</span></div>
        </div>`;
    if (key === "phone") return `
        <div class="svc-mock phone">
            <div class="svc-phone-frame">
                <div class="svc-phone-notch"></div>
                <div class="svc-post-head"><span class="svc-avatar"></span><div class="svc-line xs"></div></div>
                <div class="svc-post-media"></div>
                <div class="svc-post-actions"><span></span><span></span><span></span></div>
                <div class="svc-line sm"></div>
            </div>
        </div>`;
    if (key === "nodes") return `
        <div class="svc-mock nodes">
            <svg width="100%" height="100%" viewBox="0 0 300 200" style="position:absolute;inset:0;">
                <line x1="150" y1="100" x2="70" y2="30" stroke="#222222"/>
                <line x1="150" y1="100" x2="230" y2="30" stroke="#222222"/>
                <line x1="150" y1="100" x2="150" y2="172" stroke="#222222"/>
            </svg>
            <div class="svc-node center">Your Site</div>
            <div class="svc-node n1">Payments</div>
            <div class="svc-node n2">CRM</div>
            <div class="svc-node n3">Maps</div>
        </div>`;
    return "";
}

const svcAccordion = document.getElementById('svcAccordion');
const svcVisualPanel = document.getElementById('svcVisualPanel');

if (svcAccordion && svcVisualPanel) {
    let svcActive = 0;

    function svcRenderAccordion() {
        svcAccordion.innerHTML = svcServices.map((s, i) => `
            <div class="svc-acc-row${i === svcActive ? ' active' : ''}" data-id="${i}">
                <div class="svc-acc-head">
                    <span class="svc-acc-num">0${i + 1}</span>
                    <span class="svc-acc-title">${s.title.toUpperCase()}</span>
                </div>
                <div class="svc-acc-body">
                    <p class="svc-acc-sub">${s.sub}</p>
                    <a class="svc-acc-link scroll-link" href="#contact">&#8599; Explore service</a>
                </div>
            </div>
        `).join('');
        svcAccordion.querySelectorAll('.svc-acc-row').forEach(row => {
            row.addEventListener('click', () => svcSetActive(Number(row.dataset.id)));
        });
    }

    function svcRenderVisual() {
        svcVisualPanel.innerHTML = svcVisualFor(svcServices[svcActive].key);
    }

    function svcSetActive(id) {
        if (svcActive === id) return;
        svcActive = id;
        svcRenderAccordion();
        svcRenderVisual();
    }

    svcRenderAccordion();
    svcRenderVisual();
}

// ==================== TECH STACK BOARD ====================

const tbGroups = [
    {
        title: "Design", skills: [
            { name: "Figma", pct: 82 },
            { name: "Canva", pct: 88 },
            { name: "Adobe Express", pct: 78 }
        ]
    },
    {
        title: "Frontend", skills: [
            { name: "HTML5", pct: 92 },
            { name: "CSS3", pct: 90 },
            { name: "JavaScript", pct: 85 },
            { name: "TypeScript", pct: 74 },
            { name: "React", pct: 78 },
            { name: "Tailwind CSS", pct: 84 }
        ]
    },
    {
        title: "Backend", skills: [
            { name: "Node.js", pct: 76 },
            { name: "Express.js", pct: 72 },
            { name: "Firebase", pct: 80 }
        ]
    },
    {
        title: "Automation", skills: [
            { name: "n8n", pct: 78 },
            { name: "Python", pct: 85 }
        ]
    },
    {
        title: "Ship", skills: [
            { name: "Git", pct: 85 },
            { name: "GitHub", pct: 88 },
            { name: "Vercel", pct: 86 }
        ]
    }
];

const tbBoard = document.getElementById('tbBoard');

if (tbBoard) {
    tbBoard.innerHTML = tbGroups.map(g => `
        <div class="tb-group">
            <div class="tb-group-title">${g.title}</div>
            ${g.skills.map(s => `
                <div class="tb-skill">
                    <div class="tb-skill-row">
                        <span class="tb-skill-name">${s.name}</span>
                        <span class="tb-skill-pct">${s.pct}%</span>
                    </div>
                    <div class="tb-bar-track"><div class="tb-bar-fill" data-pct="${s.pct}"></div></div>
                </div>
            `).join('')}
        </div>
    `).join('');

    const tbObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tbBoard.querySelectorAll('.tb-bar-fill').forEach(el => {
                    el.style.width = el.dataset.pct + '%';
                });
                tbObserver.disconnect();
            }
        });
    }, { threshold: 0.25 });
    tbObserver.observe(tbBoard);
}


// ==================== FEATURED PROJECTS SPOTLIGHT ====================

const projItems = [
    {
        type: "project", title: "Promotion Website", client: "for Bhairavi Academy", img: "images/bhairavi.png",
        desc: "A custom promotional website for a NEET coaching institute, focused on attracting students and enhancing their online presence.",
        tags: ["HTML5", "CSS3", "JavaScript"], live: "https://www.bhairaviacademy.com/", url: "bhairaviacademy.com"
    },
    {
        type: "project", title: "Bhairavi AI", client: "for Bhairavi Academy", img: "images/chatbot.png",
        desc: "An AI-powered chat assistant that answers student questions instantly and captures every enquiry, so no lead falls through the cracks.",
        tags: ["Vanilla JS", "Node.js", "Firebase"], live: "https://bhairavi-chatbot-iota.vercel.app/", url: "bhairavi-chatbot.in"
    },
    {
        type: "project", title: "Portfolio Website", client: "Personal Portfolio", img: "images/portfolio.png",
        desc: "A responsive portfolio website to showcase skills, projects, and achievements in a clean, professional way.",
        tags: ["HTML5", "CSS3", "JavaScript"], live: "https://my-personal-portfolio-nine-omega.vercel.app/", url: "my-personal-portfolio-nine-omega.vercel.app"
    },
    {
        type: "project", title: "Portfolio Website", client: "Actor Prabhas — fan project", img: "images/rebel.png",
        desc: "A custom portfolio website built as a fan project to showcase his work and achievements.",
        tags: ["HTML5", "CSS3", "JavaScript"], live: "https://rebel-star-prabhas.vercel.app/", url: "rebel-star-prabhas.vercel.app"
    },
    {
        type: "project", title: "Historical Tribute", client: "Muttom Lighthouse", img: "images/lighthouse.png",
        desc: "A custom website designed for the Guardian of the Sea — the iconic Muttom Lighthouse.",
        tags: ["HTML5", "CSS3", "JavaScript"], live: "https://muttom-light-house.vercel.app/", url: "muttom-light-house.vercel.app"
    },
    { type: "cta" }
];

const projBUrl = document.getElementById('projBUrl');
const projBrowserBody = document.getElementById('projBrowserBody');

if (projBUrl && projBrowserBody) {
    let projActive = 0;
    const projInfoEyebrow = document.getElementById('projInfoEyebrow');
    const projInfoTitle = document.getElementById('projInfoTitle');
    const projInfoClient = document.getElementById('projInfoClient');
    const projInfoDesc = document.getElementById('projInfoDesc');
    const projInfoTags = document.getElementById('projInfoTags');
    const projInfoAction = document.getElementById('projInfoAction');
    const projThumbStrip = document.getElementById('projThumbStrip');
    const projProgress = document.getElementById('projProgress');

    function projRender() {
        const item = projItems[projActive];
        if (item.type === 'cta') {
            projBUrl.textContent = 'yourproject.com';
            projBrowserBody.innerHTML = `<div class="proj-cta-body"><div class="proj-cta-plus">+</div></div>`;
            projInfoEyebrow.textContent = '06 · NEXT UP';
            projInfoTitle.textContent = 'Your project could be here';
            projInfoClient.textContent = '';
            projInfoDesc.textContent = "Whatever you're building — business site, portfolio, booking system — we'll design and hand-code it from scratch.";
            projInfoTags.innerHTML = '';
            projInfoAction.innerHTML = `<a class="proj-cta-btn scroll-link" href="#contact">Start Your Project →</a>`;
        } else {
            projBUrl.textContent = item.url;
            projBrowserBody.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
            projInfoEyebrow.textContent = `0${projActive + 1} · FEATURED PROJECT`;
            projInfoTitle.textContent = item.title;
            projInfoClient.textContent = item.client;
            projInfoDesc.textContent = item.desc;
            projInfoTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
            projInfoAction.innerHTML = `<a class="proj-live-btn" href="${item.live}" target="_blank" rel="noopener">Live ↗</a>`;
        }
        Array.from(projThumbStrip.children).forEach((el, i) => el.classList.toggle('active', i === projActive));
        projProgress.innerHTML = `<span>0${projActive + 1}</span> / 0${projItems.length}`;
    }

    projThumbStrip.innerHTML = projItems.map((item, i) => {
        if (item.type === 'cta') return `<div class="proj-thumb-item proj-cta-thumb" data-i="${i}">+</div>`;
        return `<div class="proj-thumb-item" data-i="${i}"><img src="${item.img}" alt=""></div>`;
    }).join('');

    Array.from(projThumbStrip.children).forEach(el => {
        el.addEventListener('click', () => { projActive = Number(el.dataset.i); projRender(); });
    });

    projRender();
}


// ==================== CONTACT SECTION ====================

const contactChannels = [
    {
        label: "Call", value: "+91 88073 49337", href: "tel:+918807349337",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 9 9 0 0 0 2.9.46 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .46 2.9 1 1 0 0 1-.25 1z"/></svg>'
    },
    {
        label: "WhatsApp", value: "Message us", href: "https://wa.me/917639416446",
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>'
    },
    {
        label: "Email", value: "info@primustechlabs.in", href: "mailto:info@primustechlabs.in",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v14H4z"/><path d="M4 6l8 7 8-7"/></svg>'
    },
    {
        label: "Instagram", value: "@primustechlabs", href: "https://instagram.com/primustechlabs",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.3"/></svg>'
    }
];

const cbuttonsEl = document.getElementById('cbuttons');
if (cbuttonsEl) {
    cbuttonsEl.innerHTML = contactChannels.map(c => `
        <a class="cbtn" href="${c.href}" target="_blank" rel="noopener">
            <span class="icon-circle">${c.icon}</span>
            <span class="label">${c.label}</span>
            <span class="value">${c.value}</span>
        </a>
    `).join('');
}

const contactSelected = { type: "", budget: "" };
const contactOptionSets = {
    type: ["Business Website", "Portfolio Website", "Landing Page", "E-commerce", "Website Redesign", "Other"],
    budget: ["Under ₹5,000", "₹5,000 – 7,000", "₹7,000 – 10,000", "₹10,000 – 15,000", "Above ₹15,000"]
};

document.querySelectorAll('.dropdown').forEach(dd => {
    const key = dd.dataset.group;
    const trigger = dd.querySelector('.dd-trigger');
    const label = dd.querySelector('.dd-label');
    const panel = dd.querySelector('.dd-panel');

    panel.innerHTML = contactOptionSets[key].map(o => `<div class="dd-option">${o}</div>`).join('');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = panel.classList.contains('open');
        document.querySelectorAll('.dd-panel.open').forEach(p => p.classList.remove('open'));
        document.querySelectorAll('.dd-trigger.open').forEach(t => t.classList.remove('open'));
        if (!isOpen) { panel.classList.add('open'); trigger.classList.add('open'); }
    });

    panel.querySelectorAll('.dd-option').forEach(opt => {
        opt.addEventListener('click', () => {
            contactSelected[key] = opt.textContent;
            label.textContent = opt.textContent;
            trigger.classList.add('has-value');
            panel.querySelectorAll('.dd-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            panel.classList.remove('open');
            trigger.classList.remove('open');
        });
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.dd-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.dd-trigger.open').forEach(t => t.classList.remove('open'));
});

const contactForm = document.getElementById('contactForm');
let contactSubmitting = false;

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (contactSubmitting) return;

        const name = document.getElementById('fName').value.trim();
        const email = document.getElementById('fEmail').value.trim();
        const phone = document.getElementById('fPhone').value.trim();
        const message = document.getElementById('fMessage').value.trim();

        if (!name || !email) {
            alert('Please fill in your name and email.');
            return;
        }

        contactSubmitting = true;
        setTimeout(() => { contactSubmitting = false; }, 3000);

        const lines = [
            "Hi Primus Tech Labs! I'd like to start a project.",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || '-'}`,
            `Project Type: ${contactSelected.type || '-'}`,
            `Budget: ${contactSelected.budget || '-'}`,
            `Details: ${message || '-'}`
        ];
        window.open(`https://wa.me/917639416446?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    });
}

// ==================== SCROLL ANIMATIONS ====================

function handleScrollAnimation() {
    const elements = document.querySelectorAll('[class*="card"], [class*="section"]');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Call on page load

// ==================== ACTIVE NAVBAR LINK ====================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== LAZY LOADING IMAGES ====================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== SMOOTH SCROLL ON PAGE LOAD ====================

if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
}

// ==================== BACK TO TOP BUTTON ====================

const createBackToTopButton = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #7CFF00, #39FF14);
        color: #050505;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: none;
        z-index: 998;
        transition: all 0.3s ease;
        box-shadow: 0 0 30px rgba(124, 255, 0, 0.5);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopBtn.addEventListener('mouseover', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseout', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
};

createBackToTopButton();

// ==================== INITIALIZE ON PAGE LOAD ====================

document.addEventListener('DOMContentLoaded', () => {
    // Fade in elements on page load
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.classList.add('fade-in');
    });
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================

// Add ARIA labels and roles where needed
document.querySelectorAll('[role="button"]').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// ==================== PERFORMANCE MONITORING ====================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });

        perfObserver.observe({
            entryTypes: ['navigation', 'resource', 'measure']
        });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// ==================== DYNAMIC YEAR IN FOOTER ====================

const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-bottom p');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Primus Tech Labs. All Rights Reserved.`;
}

// ==================== DEBUG MODE ====================

const debugMode = false;

if (debugMode) {
    console.log('=== Primus Tech Labs Website ===');
    console.log('Particle count:', particles.length);
    console.log('Page sections:', document.querySelectorAll('section').length);
    console.log('Interactive elements:', {
        buttons: document.querySelectorAll('button').length,
        links: document.querySelectorAll('a').length,
        forms: document.querySelectorAll('form').length
    });
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
// ==================== END OF SCRIPT ====================