// portfolio/portfolio.js

document.addEventListener('DOMContentLoaded', function() {
    const portfolioSection = document.getElementById('portfolio');
    const portfolioHeader = document.querySelector('.portfolio-header');
    const polaroidPhotos = document.querySelectorAll('.polaroid-photo');
    
    // Slider variables
    let currentSlide = 0;
    const totalSlides = polaroidPhotos.length;
    let isSliderActive = false;
    
    // Intersection Observer для анимации появления
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('portfolio-animate-in');
                
                setTimeout(() => {
                    if (portfolioHeader) {
                        portfolioHeader.classList.add('portfolio-header-animate-in');
                    }
                }, 200);
                
                setTimeout(() => {
                    polaroidPhotos.forEach((photo, index) => {
                        setTimeout(() => {
                            photo.classList.add('portfolio-photo-animate-in');
                        }, index * 50);
                    });
                }, 600);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (portfolioSection) {
        sectionObserver.observe(portfolioSection);
    }
    
    // Slider functionality
    function initSlider() {
        if (window.innerWidth <= 768) {
            if (!isSliderActive) {
                createSlider();
                isSliderActive = true;
            }
        } else {
            if (isSliderActive) {
                destroySlider();
                isSliderActive = false;
            }
        }
    }
    
    function createSlider() {
        const slidesContainer = document.getElementById('portfolioSlides');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('sliderDots');
        
        if (!slidesContainer || !prevBtn || !nextBtn || !dotsContainer) return;
        
        // Create dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        // Navigation buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slidesContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        slidesContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        });
        
        updateSlider();
    }
    
    function destroySlider() {
        const dotsContainer = document.getElementById('sliderDots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
        }
        currentSlide = 0;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function updateSlider() {
        const slidesContainer = document.getElementById('portfolioSlides');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (slidesContainer) {
            const translateX = -currentSlide * (100 / totalSlides);
            slidesContainer.style.transform = `translateX(${translateX}%)`;
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-play slider
    function startAutoPlay() {
        if (isSliderActive) {
            setInterval(() => {
                if (window.innerWidth <= 768) {
                    nextSlide();
                }
            }, 4000);
        }
    }
    
    // Initialize and handle resize
    initSlider();
    window.addEventListener('resize', initSlider);
    
    // Start auto-play after a delay
    setTimeout(startAutoPlay, 2000);
    
    // Click functionality for photos
    polaroidPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            const photoNumber = this.getAttribute('data-photo');
            console.log(`Открыть фото ${photoNumber}`);
        });
    });
    
    // Initial visibility check
    const checkInitialVisibility = () => {
        const rect = portfolioSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            portfolioSection.classList.add('portfolio-animate-in');
            if (portfolioHeader) {
                portfolioHeader.classList.add('portfolio-header-animate-in');
            }
            polaroidPhotos.forEach(photo => {
                photo.classList.add('portfolio-photo-animate-in');
            });
        }
    };
    
    checkInitialVisibility();
});