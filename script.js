// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
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

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add click effect to info items
    document.querySelectorAll('.info-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add hover effect to timeline items
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #3498db';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.borderLeft = '';
        });
    });

    // Dynamic typing effect for the title (optional)
    const titleElement = document.querySelector('.title');
    const originalText = titleElement.textContent;
    
    function typeWriter(text, element, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Start typing effect after a short delay
    setTimeout(() => {
        typeWriter(originalText, titleElement, 80);
    }, 1000);


    // Add some Easter egg functionality
    let clickCount = 0;
    document.querySelector('.profile-image').addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            this.style.animation = 'spin 1s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
                clickCount = 0;
            }, 1000);
        }
    });

    // Add CSS for spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @media print {
            body { background: white !important; }
            .container { box-shadow: none !important; }
        }
    `;
    document.head.appendChild(style);

    // Certificate modal functionality
    function createCertificateModal() {
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            position: relative;
        `;
        
        const modalImage = document.createElement('img');
        modalImage.style.cssText = `
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        return { modal, modalImage };
    }
    
    // Initialize certificate modal
    const { modal, modalImage } = createCertificateModal();
    
    // Add click handlers to certificate items
    document.querySelectorAll('.certificate-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.certificate-image');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modal.style.display = 'flex';
        });
    });

    // Add loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

// Add some utility functions
function downloadResume() {
    // This would typically trigger a PDF download
    alert('Resume download feature would be implemented here');
}

function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'Michelle D. Guanlao - Portfolio',
            text: 'Check out Michelle\'s professional portfolio',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Portfolio link copied to clipboard!');
        });
    }
}
