/**
 * MNE Components - Refined Interactive Script
 * Features: Sticky Header, On-Scroll Animations, Unified Modal, Mobile Nav, EmailJS Form.
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. STICKY HEADER ---
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }

    // --- 2. MOBILE NAVIGATION ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- 3. ON-SCROLL FADE-IN ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- 4. UNIFIED MODAL LOGIC ---
    const modal = document.getElementById('modal');
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalDetails = document.getElementById('modal-details');
        const modalTitle = document.getElementById('modal-title');
        const modalText = document.getElementById('modal-text');
        const modalClose = document.querySelector('.modal-close');

        const openModal = () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.classList.contains('show')) closeModal();
        });

        // Attach listeners to cards that open the modal
        document.querySelectorAll('[data-full], [data-title][data-text]').forEach(card => {
            card.addEventListener('click', () => {
                const imgSrc = card.getAttribute('data-full');
                const title = card.getAttribute('data-title');
                const text = card.getAttribute('data-text');

                if (imgSrc) { // Image modal (Capabilities, Gallery)
                    modalImg.src = imgSrc;
                    modalImg.style.display = 'block';
                    modalDetails.style.display = 'block';
                    modalText.style.display = 'none';
                    modalTitle.textContent = title || '';
                } else if (title && text) { // Details modal (Quality)
                    modalImg.style.display = 'none';
                    modalDetails.style.display = 'block';
                    modalText.style.display = 'block';
                    modalTitle.textContent = title;
                    modalText.textContent = text;
                }
                openModal();
            });
        });
    }

    // --- 5. CONTACT FORM with EmailJS ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Your public key from EmailJS
        const EMAILJS_PUBLIC_KEY = "kmsrBovD8hS9RrOc_";
        // Your service and template IDs from EmailJS
        const EMAILJS_SERVICE_ID = "service_nib8jvh";
        const EMAILJS_TEMPLATE_ID = "template_7oiwzwp";

        emailjs.init(EMAILJS_PUBLIC_KEY);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formStatus = document.getElementById('form-status');
            const submitButton = this.querySelector('button[type="submit"]');
            
            formStatus.textContent = 'Sending...';
            formStatus.className = '';
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(() => {
                    formStatus.textContent = "Message sent successfully! We'll be in touch soon.";
                    formStatus.classList.add('success');
                    contactForm.reset();
                }, (error) => {
                    formStatus.textContent = "Failed to send message. Please try again later.";
                    formStatus.classList.add('error');
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Inquiry';
                });
        });
    }
});