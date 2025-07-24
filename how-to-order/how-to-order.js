// how-to-order/how-to-order.js

document.addEventListener('DOMContentLoaded', function() {
    const howToOrderSection = document.getElementById('how-to-order');
    const howToOrderHeader = document.querySelector('.how-to-order-header');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                setTimeout(() => {
                    if (howToOrderHeader) {
                        howToOrderHeader.classList.add('animate-in');
                    }
                }, 200);
                
                setTimeout(() => {
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 150);
                    });
                }, 600);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (howToOrderSection) {
        sectionObserver.observe(howToOrderSection);
    }
    
    const checkInitialVisibility = () => {
        const rect = howToOrderSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            howToOrderSection.classList.add('animate-in');
            if (howToOrderHeader) {
                howToOrderHeader.classList.add('animate-in');
            }
            timelineItems.forEach(item => {
                item.classList.add('animate-in');
            });
        }
    };
    
    checkInitialVisibility();
});