// footer/footer.js

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                footerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (footer) {
        footerObserver.observe(footer);
    }
    
    const checkInitialVisibility = () => {
        const rect = footer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            footer.classList.add('animate-in');
        }
    };
    
    checkInitialVisibility();
    
    const footerLinks = document.querySelectorAll('.footer-links-list a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});