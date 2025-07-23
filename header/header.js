// header/header.js

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');

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

function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const sections = [];

    const heroSection = document.getElementById('hero');
    const servicesSection = document.getElementById('services');
    const portfolioSection = document.getElementById('portfolio');
    const pricesSection = document.getElementById('prices');
    const howToOrderSection = document.getElementById('how-to-order');
    const faqSection = document.getElementById('faq');
    const contactSection = document.getElementById('contact');

    if (heroSection) {
        sections.push({
            element: heroSection,
            id: 'hero',
            navSelector: 'a[href="/"], a[href="#home"], a[href="#hero"]'
        });
    }

    if (servicesSection) {
        sections.push({
            element: servicesSection,
            id: 'services',
            navSelector: 'a[href="#services"]'
        });
    }

    if (portfolioSection) {
        sections.push({
            element: portfolioSection,
            id: 'portfolio',
            navSelector: 'a[href="#portfolio"]'
        });
    }

    if (pricesSection) {
        sections.push({
            element: pricesSection,
            id: 'prices',
            navSelector: 'a[href="#prices"]'
        });
    }

    if (howToOrderSection) {
        sections.push({
            element: howToOrderSection,
            id: 'how-to-order',
            navSelector: 'a[href="#how-to-order"]'
        });
    }

    if (faqSection) {
        sections.push({
            element: faqSection,
            id: 'faq',
            navSelector: 'a[href="#faq"]'
        });
    }

    if (contactSection) {
        sections.push({
            element: contactSection,
            id: 'contact',
            navSelector: 'a[href="#contact"]'
        });
    }

    let activeSection = null;
    const screenMiddle = window.innerHeight / 2;

    sections.forEach(section => {
        const rect = section.element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        if (section.id === 'hero') {
            if (scrollY < 100 || (elementTop <= screenMiddle && elementBottom >= 0)) {
                activeSection = section;
            }
        } else {
            if (elementTop <= screenMiddle && elementBottom >= screenMiddle) {
                activeSection = section;
            }
        }
    });

    if (!activeSection && scrollY < 100) {
        activeSection = sections.find(section => section.id === 'hero');
    }

    if (!activeSection && sections.length > 0) {
        let closestSection = null;
        let smallestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - screenMiddle);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestSection = section;
            }
        });

        activeSection = closestSection;
    }

    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (activeSection) {
        const activeLinks = document.querySelectorAll(activeSection.navSelector);
        activeLinks.forEach(link => {
            if (link.classList.contains('nav-link')) {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNavLink);

const allNavLinks = document.querySelectorAll('.nav-link');
allNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#') || href === '/') {
            allNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const correspondingLinks = document.querySelectorAll(`a[href="${href}"].nav-link`);
            correspondingLinks.forEach(correspondingLink => {
                correspondingLink.classList.add('active');
            });
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
                const targetPosition = targetElement.offsetTop - header.offsetHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

let ticking = false;

function updateHeader() {
    updateActiveNavLink();
    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    updateActiveNavLink();
});

window.addEventListener('load', function () {
    updateActiveNavLink();
});