// js/components.js

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return false;
    }
}

async function loadHeaderAndFooter() {
    const headerLoaded = await loadComponent('header-placeholder', 'components/header.html');
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');
    
    if (headerLoaded && footerLoaded) {
        // Ждем чтобы DOM обновился
        setTimeout(() => {
            initializeComponents();
        }, 50);
    }
}

function initializeComponents() {
    // Инициализируем header вручную
    initializeHeader();
    
    // Инициализируем footer вручную  
    initializeFooter();
    
    // Показываем компоненты
    const footer = document.querySelector('footer');
    const header = document.querySelector('.header');
    
    if (footer) {
        footer.classList.add('animate-in');
    }
    
    if (header) {
        header.classList.add('animate-in');
    }
}

function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.getElementById('header');

    if (!hamburger || !mobileMenu || !header) {
        console.error('Header elements not found');
        return;
    }

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('.nav-link, .cta-button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Остальная логика header'а
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '/' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            if (href.startsWith('#') && href !== '#') {
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.offsetTop + 50;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 1024) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function initializeFooter() {
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
}

document.addEventListener('DOMContentLoaded', loadHeaderAndFooter);