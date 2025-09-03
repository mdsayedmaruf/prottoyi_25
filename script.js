// DOM Elements
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close');
const downloadMessage = document.getElementById('downloadMessage');

// Download function
function downloadApp(version) {
    let downloadUrl = '';
    let message = '';
    
    switch(version) {
        case 'universal':
            downloadUrl = 'https://drive.google.com/file/d/1Z13Tnhaae3eRa4kqKcXtbytiNwn7A8Sp/view?usp=sharing';
            message = 'Downloading Universal APK for all devices...';
            break;
        case '64bit':
            downloadUrl = 'https://drive.google.com/file/d/1zj95Fnwstj7aTsuKQeOXU50Maz_FB9Ke/view?usp=sharing';
            message = 'Downloading 64-bit APK for modern devices...';
            break;
        case '32bit':
            downloadUrl = 'https://drive.google.com/file/d/1c0qSznrfTJQEWgrR00vbOky5zX_EgMlI/view?usp=sharing';
            message = 'Downloading 32-bit APK for older devices...';
            break;
        default:
            message = 'Download starting...';
    }
    
    // Show modal
    downloadMessage.textContent = message;
    modal.style.display = 'block';
    
    // Add bounce animation to modal
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('bounce');
    
    // Start actual download
    setTimeout(() => {
        // Open download link in new tab
        window.open(downloadUrl, '_blank');
        
        // Update message
        downloadMessage.textContent = 'Download started! Check your browser downloads.';
        
        // Hide loading spinner
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
        
        // Auto close modal after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);
    }, 2000);
    
    // Track download analytics (you can integrate with Google Analytics or other services)
    trackDownload(version);
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    
    // Reset modal content
    setTimeout(() => {
        downloadMessage.textContent = 'Your download will begin shortly.';
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'block';
        }
        
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.remove('bounce');
    }, 300);
}

// Track download function (for analytics)
function trackDownload(version) {
    // You can integrate with Google Analytics or other tracking services
    console.log(`Download tracked: ${version} APK`);
    
    // Example Google Analytics tracking (uncomment if you have GA setup)
    // gtag('event', 'download', {
    //     'event_category': 'APK',
    //     'event_label': version,
    //     'value': 1
    // });
}

// Event listeners
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, .header');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add initial animation to header
    const header = document.querySelector('.header');
    if (header) {
        header.classList.add('fade-in');
    }
});

// Add hover effects to download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect CSS dynamically
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Apply ripple effect to download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', createRipple);
});

// Device detection for better UX
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    return { isMobile, isAndroid, isIOS };
}

// Show appropriate download suggestion based on device
document.addEventListener('DOMContentLoaded', () => {
    const device = detectDevice();
    
    if (device.isIOS) {
        // Show message for iOS users
        const downloadSection = document.querySelector('.download-section');
        const iosMessage = document.createElement('div');
        iosMessage.className = 'ios-message';
        iosMessage.innerHTML = `
            <p style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <i class="fas fa-info-circle"></i> 
                You're using an iOS device. This app is designed for Android devices.
            </p>
        `;
        downloadSection.insertBefore(iosMessage, downloadSection.querySelector('.download-buttons'));
    }
    
    if (device.isAndroid) {
        // Highlight universal APK for Android users
        const universalBtn = document.querySelector('.download-btn.primary');
        if (universalBtn) {
            const recommendedBadge = document.createElement('span');
            recommendedBadge.textContent = 'Recommended';
            recommendedBadge.style.cssText = `
                position: absolute;
                top: -10px;
                right: -10px;
                background: #27ae60;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            `;
            universalBtn.style.position = 'relative';
            universalBtn.appendChild(recommendedBadge);
        }
    }
});

// Add loading state to buttons
function addLoadingState(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
    }, 2000);
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%c🎓 Prottoyi 25 - CSE Batch App', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped by Sayed Maruf', 'color: #2c3e50; font-size: 14px;');
console.log('%cUniversity of Chittagong', 'color: #7f8c8d; font-size: 12px;');