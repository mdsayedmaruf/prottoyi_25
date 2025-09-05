// Modal functionality
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close');

// Close modal when clicking the close button
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Download button functionality
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Check if this button has a real link (not just #)
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            // Let the browser handle the redirect naturally
            return;
        }
        
        e.preventDefault();
        
        // Show the download modal for buttons without real links
        modal.style.display = 'block';
        
        // Get the button type from the content
        const btnTitle = this.querySelector('.btn-title').textContent;
        const downloadMessage = document.getElementById('downloadMessage');
        
        downloadMessage.textContent = `Preparing ${btnTitle} download...`;
        
        // Simulate download process
        setTimeout(() => {
            downloadMessage.textContent = 'Download will begin shortly. Thank you for downloading Prottoyi 25!';
        }, 2000);
        
        // Auto close modal after 4 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 4000);
    });
});

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add loading animation to screenshots
const screenshots = document.querySelectorAll('.screenshot-item img');
screenshots.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Screenshot not available';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Prottoyi 25 Landing Page Loaded');
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});