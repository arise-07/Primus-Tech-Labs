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

const contactForm = document.getElementById('contactForm');

const validators = {
    fullName: (value) => {
        if (!value.trim()) {
            return 'Full Name is required';
        }
        if (value.trim().length < 3) {
            return 'Full Name must be at least 3 characters';
        }
        return '';
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            return 'Email is required';
        }
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email';
        }
        return '';
    },
    phone: (value) => {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!value.trim()) {
            return 'Phone Number is required';
        }
        if (!phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
        }
        return '';
    },
    projectType: (value) => {
        if (!value) {
            return 'Please select a Project Type';
        }
        return '';
    },
    budget: (value) => {
        if (!value) {
            return 'Please select a Budget Range';
        }
        return '';
    },
    message: (value) => {
        if (!value.trim()) {
            return 'Message is required';
        }
        if (value.trim().length < 10) {
            return 'Message must be at least 10 characters';
        }
        return '';
    }
};

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const validator = validators[fieldId];

    if (!validator) return true;

    const error = validator(field.value);

    if (error) {
        errorElement.textContent = error;
        field.classList.add('error');
        return false;
    } else {
        errorElement.textContent = '';
        field.classList.remove('error');
        return true;
    }
}

// Real-time validation
Object.keys(validators).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => validateField(fieldId));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(fieldId);
            }
        });
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = ['fullName', 'email', 'phone', 'projectType', 'budget', 'message'];
    let isValid = true;

    fields.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            projectType: document.getElementById('projectType').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Log to console (in production, this would be sent to a server)
        console.log('Form submitted:', formData);

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = '✓ Thank you! Your inquiry has been received. We\'ll contact you soon!';

        // Reset form
        contactForm.reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
            successMessage.textContent = '';
        }, 5000);

        // Optional: Send to email service
        // In production, you would use FormSubmit, Getform, or similar service
        sendFormData(formData);
    }
});

// Optional: Send form data to a service (requires backend configuration)
function sendFormData(data) {
    // This is a placeholder. In production, you would:
    // 1. Use FormSubmit (https://formsubmit.co/) - Free, no backend needed
    // 2. Use Getform (https://getform.io/) - Free form backend
    // 3. Set up your own backend endpoint

    // Example with FormSubmit:
    // fetch('https://formsubmit.co/your@email.com', {
    //     method: 'POST',
    //     body: new FormData(contactForm),
    // })
    // .then(response => console.log('Form sent successfully'))
    // .catch(error => console.error('Error:', error));
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

// ==================== PREVENT MULTIPLE FORM SUBMISSIONS ====================

let isFormSubmitting = false;

contactForm.addEventListener('submit', (e) => {
    if (isFormSubmitting) {
        e.preventDefault();
        return;
    }

    isFormSubmitting = true;

    setTimeout(() => {
        isFormSubmitting = false;
    }, 3000);
});

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
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values from form
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const projectType = document.getElementById("projectType").value;
    const budget = document.getElementById("budget").value;
    const message = document.getElementById("message").value;

   
    const whatsappNumber = "917639416446";

    // Create WhatsApp message
    const whatsappMessage = `
📌 New Website Inquiry

 Name: ${name}
 Email: ${email}
 Phone: ${phone}
 Project Type: ${projectType}
 Budget: ${budget}

 Message:
${message}
    `;

    // Encode message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp link
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(url, "_blank");
});

// ==================== END OF SCRIPT ====================