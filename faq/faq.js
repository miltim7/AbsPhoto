// faq/faq.js

document.addEventListener('DOMContentLoaded', function() {
    const faqSection = document.getElementById('faq');
    const faqHeader = document.querySelector('.faq-header');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                setTimeout(() => {
                    if (faqHeader) {
                        faqHeader.classList.add('animate-in');
                    }
                }, 200);
                
                setTimeout(() => {
                    faqItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }, 600);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (faqSection) {
        sectionObserver.observe(faqSection);
    }
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = this.querySelector('.faq-icon');
            const isActive = faqItem.classList.contains('active');
            
            faqItems.forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');
                answer.classList.remove('active');
                icon.textContent = '+';
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.classList.add('active');
                faqIcon.textContent = '×';
            }
        });
    });
    
    const checkInitialVisibility = () => {
        const rect = faqSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            faqSection.classList.add('animate-in');
            if (faqHeader) {
                faqHeader.classList.add('animate-in');
            }
            faqItems.forEach(item => {
                item.classList.add('animate-in');
            });
        }
    };
    
    checkInitialVisibility();
});