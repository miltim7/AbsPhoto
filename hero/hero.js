// hero/hero.js

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const heroButtons = document.querySelectorAll('.hero-btn');
    const scrollArrow = document.querySelector('.hero-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                setTimeout(() => {
                    if (heroText) {
                        heroText.classList.add('animate-in');
                    }
                }, 300);
                
                setTimeout(() => {
                    if (heroImage) {
                        heroImage.classList.add('animate-in');
                    }
                }, 600);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (heroSection) {
        sectionObserver.observe(heroSection);
    }
    
    const checkInitialVisibility = () => {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            heroSection.classList.add('animate-in');
            if (heroText) {
                heroText.classList.add('animate-in');
            }
            if (heroImage) {
                heroImage.classList.add('animate-in');
            }
        }
    };
    
    checkInitialVisibility();
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});