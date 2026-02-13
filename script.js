// ============================================
// TUNIX MUSIC BOT - COMPLETE SCRIPT
// ============================================

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
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Active link highlighting based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href').split('?')[0]; // Remove query params
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ============================================
// LOGO FIX - FORCE RELOAD WITH CACHE BUSTING
// ============================================

// Function to fix all logo images
function fixLogoImages() {
    console.log('🔧 Fixing logo images...');
    
    // Add timestamp to all logo images
    document.querySelectorAll('img[src*="mainlogo.png"]').forEach(img => {
        const currentSrc = img.getAttribute('src');
        // Remove any existing query params and add new timestamp
        const baseSrc = currentSrc.split('?')[0];
        const newSrc = baseSrc + '?v=' + Date.now();
        img.src = newSrc;
        console.log('✅ Logo fixed:', newSrc);
    });

    // Fix favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        const currentHref = favicon.getAttribute('href');
        const baseHref = currentHref.split('?')[0];
        favicon.setAttribute('href', baseHref + '?v=' + Date.now());
    }
}

// Run logo fix immediately
fixLogoImages();

// Run again after page fully loads
window.addEventListener('load', function() {
    setTimeout(fixLogoImages, 100);
});

// ============================================
// NOTIFY ME FUNCTION
// ============================================

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
    
    // Remove any existing notifications
    const existingNotif = document.querySelector('.custom-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
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
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
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
        transition: color 0.3s;
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

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

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

// ============================================
// HOVER EFFECTS
// ============================================

document.querySelectorAll('.feature-card, .bot-card-detailed, .support-card, .command-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// COPY COMMAND TO CLIPBOARD
// ============================================

document.querySelectorAll('.command-item code').forEach(code => {
    code.addEventListener('click', async function(e) {
        const text = this.textContent;
        try {
            await navigator.clipboard.writeText(text);
            
            // Show temporary tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = '✓ Copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #5865F2;
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                margin-left: 0.5rem;
                animation: fadeInOut 1s ease forwards;
                white-space: nowrap;
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

// Add copy tooltip animation
const copyStyle = document.createElement('style');
copyStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(5px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-5px); }
    }
    
    .command-item code {
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .command-item code:hover {
        background: rgba(88, 101, 242, 0.4);
    }
`;
document.head.appendChild(copyStyle);

// ============================================
// PAGE TRANSITION EFFECT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

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
document.querySelectorAll('.feature-card, .command-category, .bot-card-detailed, .support-card, .faq-item, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
    }
});

// ============================================
// PREVENT MULTIPLE NOTIFICATION BUTTONS
// ============================================

document.querySelectorAll('.btn-notify').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Extract bot name from onclick or data attribute
        let botName = btn.getAttribute('data-bot');
        if (!botName) {
            const onclickAttr = btn.getAttribute('onclick');
            const match = onclickAttr?.match(/'([^']+)'/) || onclickAttr?.match(/"([^"]+)"/);
            botName = match ? match[1] : 'bot';
        }
        
        notifyMe(botName);
    });
});

// ============================================
// RESPONSIVE COMMANDS TABLE
// ============================================

function makeCommandsResponsive() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.command-item').forEach(item => {
            const code = item.querySelector('code');
            const span = item.querySelector('span');
            if (code && span) {
                item.style.flexDirection = 'column';
                item.style.alignItems = 'center';
                item.style.textAlign = 'center';
                item.style.padding = '1rem';
                code.style.marginBottom = '0.5rem';
                code.style.display = 'inline-block';
            }
        });
    } else {
        document.querySelectorAll('.command-item').forEach(item => {
            item.style.flexDirection = 'row';
            item.style.alignItems = 'center';
            item.style.textAlign = 'left';
            item.style.padding = '0.75rem';
            const code = item.querySelector('code');
            if (code) {
                code.style.marginBottom = '0';
                code.style.display = 'inline';
            }
        });
    }
}

// Call on load and resize
window.addEventListener('load', makeCommandsResponsive);
window.addEventListener('resize', makeCommandsResponsive);

// ============================================
// HANDLE BROWSER BACK/FORWARD CACHE
// ============================================

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🚀 Tunix Music Bot Website', 'font-size: 20px; color: #5865F2; font-weight: bold;');
console.log('%cWelcome to Tunix Music Bot! Add our bot to your Discord server for high-quality music playback.', 'color: #b0b0b0; font-size: 14px;');
console.log('%c📱 ' + window.innerWidth + 'x' + window.innerHeight, 'color: #57F287; font-size: 12px;');

// ============================================
// ERROR HANDLING FOR MISSING IMAGES
// ============================================

document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('⚠️ Image failed to load:', e.target.src);
        // Try to fix logo if it fails
        if (e.target.src.includes('mainlogo.png')) {
            setTimeout(() => {
                e.target.src = 'public/assets/mainlogo.png?v=' + Date.now();
            }, 500);
        }
    }
}, true);

// ============================================
// BUTTON LOADING STATES
// ============================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('btn-notify')) return;
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            return;
        }
        
        // Add loading effect for external links
        if (this.href && this.href.startsWith('http') && !this.href.includes('discord.com')) {
            const originalText = this.textContent;
            const originalWidth = this.offsetWidth;
            
            this.style.minWidth = originalWidth + 'px';
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Restore after timeout (in case navigation is slow)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                this.style.minWidth = '';
            }, 2000);
        }
    });
});

// ============================================
// MOBILE DETECTION
// ============================================

function isMobile() {
    return window.innerWidth <= 768;
}

// Add mobile class to body for CSS targeting
if (isMobile()) {
    document.body.classList.add('mobile-view');
}

window.addEventListener('resize', function() {
    if (isMobile()) {
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
});

// ============================================
// SCROLL TO TOP BUTTON (Optional)
// ============================================

// Create scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-top-btn';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #5865F2;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9998;
    box-shadow: 0 4px 10px rgba(88, 101, 242, 0.3);
    transition: all 0.3s;
`;

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
    scrollBtn.style.background = '#4752c4';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
    scrollBtn.style.background = '#5865F2';
});

document.body.appendChild(scrollBtn);

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.style.display = 'none';
    }
});

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================

// Make functions globally available
window.notifyMe = notifyMe;
window.fixLogoImages = fixLogoImages;

console.log('✅ Tunix Music Bot script loaded successfully!');
