// prices/prices.js

document.addEventListener('DOMContentLoaded', function() {
    const pricesSection = document.getElementById('prices');
    const pricesHeader = document.querySelector('.prices-header');
    const priceCards = document.querySelectorAll('.price-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                setTimeout(() => {
                    if (pricesHeader) {
                        pricesHeader.classList.add('animate-in');
                    }
                }, 200);
                
                setTimeout(() => {
                    priceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }, 600);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (pricesSection) {
        sectionObserver.observe(pricesSection);
    }
    
    const priceButtons = document.querySelectorAll('.price-button');
    priceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector('#how-to-order');
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const checkInitialVisibility = () => {
        const rect = pricesSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            pricesSection.classList.add('animate-in');
            if (pricesHeader) {
                pricesHeader.classList.add('animate-in');
            }
            priceCards.forEach(card => {
                card.classList.add('animate-in');
            });
        }
    };
    
    checkInitialVisibility();
});