// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers (except first one)
        if (item !== faqItems[0]) {
            answer.style.display = 'none';
            item.classList.add('collapsed');
        }
        
        question.addEventListener('click', function() {
            const isCollapsed = item.classList.contains('collapsed');
            
            if (isCollapsed) {
                answer.style.display = 'block';
                item.classList.remove('collapsed');
            } else {
                answer.style.display = 'none';
                item.classList.add('collapsed');
            }
        });
        
        // Add cursor pointer to questions
        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.pain-point, .value-prop, .step, .testimonial, .pricing-card, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // CTA Button Click Tracking
    const ctaButtons = document.querySelectorAll('.cta-button-primary, .cta-button-secondary, .cta-button-outline');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demo purposes, prevent default action and show alert
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Assessment') || buttonText.includes('Free')) {
                showModal('EQ Assessment', 'This would redirect to the EQ assessment form. The assessment takes about 5 minutes and provides immediate insights into your leadership strengths and growth areas.');
            } else if (buttonText.includes('Demo')) {
                showModal('Demo Video', 'This would show a 2-minute demo video explaining how the platform works and the value it provides to nonprofit and church leaders.');
            } else if (buttonText.includes('Trial')) {
                showModal('Free Trial', 'This would start your free trial with full access to the Pro plan features for 14 days. No credit card required.');
            } else if (buttonText.includes('Discovery Call')) {
                showModal('Discovery Call', 'This would redirect to a calendar booking system where you can schedule a 30-minute discovery call with one of our coaching specialists.');
            } else {
                showModal('Coming Soon', 'This feature is currently in development. Thank you for your interest in the EQ Leadership Platform!');
            }
        });
    });

    // Form submission handling (for future use)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showModal('Form Submitted', 'Thank you for your interest! We will contact you shortly.');
        });
    });

    // Sticky navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
});

// Modal functionality
function showModal(title, message) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('demo-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modal-title">${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p id="modal-message">${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="cta-button-primary modal-ok">Got it!</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            #demo-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }
            
            .modal-overlay {
                background: rgba(0, 0, 0, 0.5);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease-out;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-header {
                padding: 2rem 2rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-blue);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: #374151;
            }
            
            .modal-body {
                padding: 1rem 2rem;
            }
            
            .modal-body p {
                margin: 0;
                color: #6b7280;
                line-height: 1.6;
            }
            
            .modal-footer {
                padding: 1rem 2rem 2rem;
                text-align: center;
            }
            
            .modal-ok {
                margin: 0;
            }
        `;
        document.head.appendChild(modalStyles);

        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', hideModal);
        modal.querySelector('.modal-ok').addEventListener('click', hideModal);
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal();
            }
        });
    } else {
        // Update existing modal
        modal.querySelector('#modal-title').textContent = title;
        modal.querySelector('#modal-message').textContent = message;
    }

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function hideModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Keyboard accessibility for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideModal();
    }
});

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat strong, .stat-item strong');
    
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentNumber = 0;
            const increment = numericValue / 50; // Animate over 50 steps
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numericValue) {
                    currentNumber = numericValue;
                    clearInterval(timer);
                }
                
                // Format the number back to original format
                if (finalNumber.includes('%')) {
                    stat.textContent = Math.floor(currentNumber) + '%';
                } else if (finalNumber.includes('+')) {
                    stat.textContent = Math.floor(currentNumber).toLocaleString() + '+';
                } else if (finalNumber.includes('#')) {
                    stat.textContent = '#' + Math.floor(currentNumber);
                } else {
                    stat.textContent = Math.floor(currentNumber).toLocaleString();
                }
            }, 30);
        }
    });
}

// Trigger stats animation when stats section comes into view
const statsSection = document.querySelector('.statistics, .stats-bar');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading state management
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Add a subtle fade-in effect to the page
    const pageStyle = document.createElement('style');
    pageStyle.textContent = `
        body:not(.loaded) {
            opacity: 0;
        }
        
        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease-in;
        }
    `;
    document.head.appendChild(pageStyle);
});

// Performance optimization: Lazy load background images
function lazyLoadBackgrounds() {
    const elements = document.querySelectorAll('[data-bg]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.backgroundImage = `url(${element.dataset.bg})`;
                element.classList.add('bg-loaded');
                observer.unobserve(element);
            }
        });
    });

    elements.forEach(element => imageObserver.observe(element));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadBackgrounds);