// contact/contact.js

document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.getElementById('contact');
    const contactHeader = document.querySelector('.contact-header');
    const contactInfo = document.querySelector('.contact-info');
    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    const contactForm = document.querySelector('.contact-form');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                setTimeout(() => {
                    if (contactHeader) {
                        contactHeader.classList.add('animate-in');
                    }
                }, 200);
                
                setTimeout(() => {
                    if (contactInfo) {
                        contactInfo.classList.add('animate-in');
                    }
                }, 600);
                
                setTimeout(() => {
                    if (contactFormWrapper) {
                        contactFormWrapper.classList.add('animate-in');
                    }
                }, 800);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (contactSection) {
        sectionObserver.observe(contactSection);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }
            
            submitButton.textContent = 'Отправляется...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Отправлено!';
                submitButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = 'linear-gradient(135deg, #000000 0%, #333333 100%)';
                    this.reset();
                    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
                }, 2000);
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    const checkInitialVisibility = () => {
        const rect = contactSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            contactSection.classList.add('animate-in');
            if (contactHeader) {
                contactHeader.classList.add('animate-in');
            }
            if (contactInfo) {
                contactInfo.classList.add('animate-in');
            }
            if (contactFormWrapper) {
                contactFormWrapper.classList.add('animate-in');
            }
        }
    };
    
    checkInitialVisibility();
});