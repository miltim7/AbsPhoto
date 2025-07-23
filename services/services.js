// services/services.js

document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.getElementById('services');
    const servicesHeader = document.querySelector('.services-header');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Intersection Observer для анимации появления
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Анимация появления всего блока
                entry.target.classList.add('animate-in');
                
                // Анимация заголовка с небольшой задержкой
                setTimeout(() => {
                    if (servicesHeader) {
                        servicesHeader.classList.add('animate-in');
                    }
                }, 200);
                
                // Анимация карточек с задержкой
                setTimeout(() => {
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }, 600);
                
                // Прекращаем наблюдение после первого появления
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Начинаем наблюдение за секцией
    if (servicesSection) {
        sectionObserver.observe(servicesSection);
    }
    
    // Клик по карточкам для перехода к заказу
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetElement = document.querySelector('#how-to-order');
            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Проверка на уже видимые элементы при загрузке страницы
    const checkInitialVisibility = () => {
        const rect = servicesSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            servicesSection.classList.add('animate-in');
            if (servicesHeader) {
                servicesHeader.classList.add('animate-in');
            }
            serviceCards.forEach(card => {
                card.classList.add('animate-in');
            });
        }
    };
    
    // Проверяем видимость при загрузке
    checkInitialVisibility();
});