// This file contains JavaScript functionality for the website, including smooth scrolling, animations, and interactive features.

// Initialize AOS with more subtle animations
AOS.init({
    duration: 1200,
    once: true,
    offset: 150,
    easing: 'ease-in-out'
});

// Navbar color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '1';
        this.querySelector('.portfolio-img').style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '0';
        this.querySelector('.portfolio-img').style.transform = 'scale(1)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Enhanced parallax effect
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;
        
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
            const speed = 0.5;
            const yPos = -(scrolled - elementTop) * speed;
            element.style.backgroundPositionY = `${yPos}px`;
        }
    });
}

// Smooth navbar background transition
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active section highlighting with intersection observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Event listeners
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        updateNavbar();
        parallaxScroll();
    });
});

// Initialize on load
window.addEventListener('load', () => {
    updateNavbar();
    parallaxScroll();
});