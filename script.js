// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavbar();
    initializeFeedbackSlider();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeGamingEffects();
});

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // Create periodic particle bursts
    setInterval(() => {
        if (Math.random() > 0.7) {
            createParticle(particlesContainer, true);
        }
    }, 1000);
}

function createParticle(container, isBurst = false) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = getRandomColor();
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    
    container.appendChild(particle);
    
    // Animate particle
    const duration = isBurst ? 2000 : 8000 + Math.random() * 4000;
    const animation = particle.animate([
        { 
            opacity: 0,
            transform: 'translate(0, 0) scale(0.5)',
        },
        { 
            opacity: 1,
            transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(1)`,
            offset: 0.1
        },
        { 
            opacity: 0,
            transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(0.2)`,
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    });
    
    animation.addEventListener('finish', () => {
        particle.remove();
    });
}

function getRandomColor() {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080', '#8000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== NAVBAR FUNCTIONALITY =====
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== WHATSAPP REDIRECT =====
function redirectToWhatsApp() {
    const phoneNumber = '919797865597';
    const message = 'Hi! I am interested in SKYNET Institute courses. Please provide more information.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===== FEEDBACK SLIDER =====
function initializeFeedbackSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.feedback-card');
    const dots = document.querySelectorAll('.dot');
    
    // Auto-rotate feedback
    setInterval(() => {
        showFeedback((currentSlide + 1) % slides.length);
    }, 5000);
}

function showFeedback(index) {
    const slides = document.querySelectorAll('.feedback-card');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active classes
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('course-card')) {
                    animateCourseCard(entry.target);
                }
                if (entry.target.classList.contains('about-card')) {
                    animateAboutCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.course-card, .about-card, .fee-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

function animateCourseCard(card) {
    setTimeout(() => {
        card.style.animation = 'cardFlip 0.8s ease-out';
    }, Math.random() * 500);
}

function animateAboutCard(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.animation = 'iconExplode 1s ease-out';
    }
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            subtitle.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    }
}

// ===== GAMING EFFECTS =====
function initializeGamingEffects() {
    // Mouse trail effect
    let trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        // Add mouse position to trail
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Remove old trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
        
        // Create trail effect
        if (trail.length > 1) {
            createTrailEffect(e.clientX, e.clientY);
        }
    });
    
    // Screen shake effect on button hover
    document.querySelectorAll('.cta-btn, .course-btn, .fee-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            createScreenShake();
        });
    });
    
    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Random color burst effects
    setInterval(() => {
        if (Math.random() > 0.8) {
            createColorBurst();
        }
    }, 3000);
}

function createTrailEffect(x, y) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = getRandomColor();
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = `0 0 10px ${trail.style.background}`;
    
    document.body.appendChild(trail);
    
    const animation = trail.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0)' }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    animation.addEventListener('finish', () => {
        trail.remove();
    });
}

function createScreenShake() {
    const intensity = 2;
    const duration = 200;
    const startTime = Date.now();
    
    function shake() {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
            const x = (Math.random() - 0.5) * intensity;
            const y = (Math.random() - 0.5) * intensity;
            document.body.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        } else {
            document.body.style.transform = 'translate(0, 0)';
        }
    }
    shake();
}

function createColorBurst() {
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.left = Math.random() * window.innerWidth + 'px';
    burst.style.top = Math.random() * window.innerHeight + 'px';
    burst.style.width = '20px';
    burst.style.height = '20px';
    burst.style.background = `radial-gradient(circle, ${getRandomColor()}, transparent)`;
    burst.style.borderRadius = '50%';
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '100';
    
    document.body.appendChild(burst);
    
    const animation = burst.animate([
        { 
            opacity: 1, 
            transform: 'scale(0)',
            filter: 'blur(0px)'
        },
        { 
            opacity: 0.8, 
            transform: 'scale(10)',
            filter: 'blur(2px)'
        },
        { 
            opacity: 0, 
            transform: 'scale(20)',
            filter: 'blur(5px)'
        }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    animation.addEventListener('finish', () => {
        burst.remove();
    });
}

// ===== FORM HANDLING =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[placeholder="Your Name"]').value;
    const email = formData.get('email') || event.target.querySelector('input[placeholder="Your Email"]').value;
    const phone = formData.get('phone') || event.target.querySelector('input[placeholder="Your Phone"]').value;
    const course = event.target.querySelector('select').value;
    const message = event.target.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! I'm interested in SKYNET Institute courses.
    
Name: ${name}
Email: ${email}
Phone: ${phone}
Course Interest: ${course}
Message: ${message}
    
Please provide more information.`;
    
    // Redirect to WhatsApp
    const phoneNumber = '919797865597';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    
    // Show success animation
    showSuccessAnimation();
}

function showSuccessAnimation() {
    const success = document.createElement('div');
    success.innerHTML = '✅ Redirecting to WhatsApp...';
    success.style.position = 'fixed';
    success.style.top = '50%';
    success.style.left = '50%';
    success.style.transform = 'translate(-50%, -50%)';
    success.style.background = 'rgba(0, 255, 0, 0.9)';
    success.style.color = '#000';
    success.style.padding = '20px 40px';
    success.style.borderRadius = '10px';
    success.style.fontSize = '1.2rem';
    success.style.fontWeight = 'bold';
    success.style.zIndex = '10000';
    success.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
    
    document.body.appendChild(success);
    
    setTimeout(() => {
        success.remove();
    }, 2000);
}

// ===== ADDITIONAL GAMING EFFECTS =====
function initializeGlitchEffects() {
    // Random glitch effects on course cards
    setInterval(() => {
        const cards = document.querySelectorAll('.course-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        
        if (randomCard && Math.random() > 0.9) {
            randomCard.style.animation = 'cardGlitch 0.3s ease-out';
            setTimeout(() => {
                randomCard.style.animation = '';
            }, 300);
        }
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update any frame-based animations here
    ticking = false;
}

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    initializeGlitchEffects();
    
    // Add entrance animations to elements
    document.querySelectorAll('.course-card, .about-card, .fee-card').forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
        el.classList.add('fade-in');
    });
});

// ===== ADDITIONAL CSS ANIMATIONS (injected via JS) =====
const additionalStyles = `
@keyframes cardFlip {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
    100% { transform: rotateY(0deg); }
}

@keyframes iconExplode {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.5) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
}

@keyframes cardGlitch {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-5px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-3px); }
    80% { transform: translateX(3px); }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);