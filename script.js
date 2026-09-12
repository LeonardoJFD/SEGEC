const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
    });

    mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.querySelector('.sr-only').textContent = 'Abrir menú';
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.querySelector('.sr-only').textContent = 'Abrir menú';
            navToggle.focus();
        }
    });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', isCurrent);
                if (isCurrent) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const subject = encodeURIComponent(`Consulta desde el sitio web - ${name}`);
        const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\n${message}`);

        window.location.href = `mailto:leonardofonsecadonoso@gmail.com?subject=${subject}&body=${body}`;
    });
}