// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Active link highlighting based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Notify Me function for upcoming bots
function notifyMe(botName) {
    const botNames = {
        'security': 'Tunix Security',
        'ai': 'Tunix AI',
        'moderation': 'Tunix Moderation',
        'games': 'Tunix Games',
        'economy': 'Tunix Economy',
        'tickets': 'Tunix Tickets'
    };
    
    const displayName = botNames[botName] || botName;
    
    // Create custom notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <div class="notification-text">
                <strong>Thanks for your interest!</strong>
                <p>We'll notify you when ${displayName} launches. Join our Discord for updates!</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .custom-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1a1a2e;
        border-left: 4px solid #5865F2;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }

    .notification-icon {
        background: #57F287;
        color: #000;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .notification-text {
        flex: 1;
    }

    .notification-text strong {
        color: #fff;
        display: block;
        margin-bottom: 0.25rem;
    }

    .notification-text p {
        color: #b0b0b0;
        font-size: 0.9rem;
        margin: 0;
    }

    .notification-close {
        background: none;
        border: none;
        color: #b0b0b0;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        flex-shrink: 0;
    }

    .notification-close:hover {
        color: #fff;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card, .bot-card-detailed, .support-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Copy command to clipboard (for commands page)
document.querySelectorAll('.command-item code').forEach(code => {
    code.addEventListener('click', async function() {
        const text = this.textContent;
        try {
            await navigator.clipboard.writeText(text);
            
            // Show temporary tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #5865F2;
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                margin-left: 0.5rem;
                animation: fadeOut 1s ease forwards;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// Page transition effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .command-category, .bot-card-detailed, .support-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
    }
});

// Prevent multiple notification buttons from firing multiple times
document.querySelectorAll('.btn-notify').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const botName = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 'bot';
        notifyMe(botName);
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('btn-notify')) return;
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            return;
        }
        
        // Add loading effect for external links
        if (this.href && this.href.startsWith('http')) {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 1000);
        }
    });
});

// Handle browser back/forward cache
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

// Responsive table handling for commands
function makeCommandsResponsive() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.command-item').forEach(item => {
            const code = item.querySelector('code');
            const span = item.querySelector('span');
            if (code && span) {
                item.style.flexDirection = 'column';
                item.style.alignItems = 'center';
                item.style.textAlign = 'center';
                code.style.marginBottom = '0.5rem';
            }
        });
    } else {
        document.querySelectorAll('.command-item').forEach(item => {
            item.style.flexDirection = 'row';
            item.style.alignItems = 'center';
            item.style.textAlign = 'left';
            const code = item.querySelector('code');
            if (code) code.style.marginBottom = '0';
        });
    }
}

// Call on load and resize
window.addEventListener('load', makeCommandsResponsive);
window.addEventListener('resize', makeCommandsResponsive);

// Console welcome message
console.log('%c🚀 Tunix Music Bot Website', 'font-size: 20px; color: #5865F2; font-weight: bold;');
console.log('%cWelcome to Tunix Music Bot! Add our bot to your Discord server for high-quality music playback.', 'color: #b0b0b0; font-size: 14px;');
