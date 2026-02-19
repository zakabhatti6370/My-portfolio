/* ================================================= */
/* === Privacy Page - Interactive JavaScript === */
/* === Created by ZakaUllah === */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =================================================
    // === Initialize Privacy Page Features ===
    // =================================================
    initSmoothScroll();
    initDownloadButtons();
    initPrintVersion();
    
    // =================================================
    // === Smooth Scroll for Table of Contents ===
    // =================================================
    function initSmoothScroll() {
        const tocLinks = document.querySelectorAll('.privacy-toc a');
        
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Remove highlight from all sections
                    document.querySelectorAll('.privacy-card').forEach(card => {
                        card.classList.remove('highlight');
                    });
                    
                    // Add highlight to target section
                    targetElement.classList.add('highlight');
                    
                    // Scroll to section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Remove highlight after animation
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 2000);
                }
            });
        });
    }
    
    // =================================================
    // === Download Privacy Policy ===
    // =================================================
    window.downloadPrivacy = function(format) {
        const content = generatePrivacyContent();
        
        if (format === 'pdf') {
            // For PDF, we'll create a print-friendly version
            window.print();
        } else if (format === 'txt') {
            // Create text file
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ZakaUllah-Privacy-Policy.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showNotification('Privacy policy downloaded as text file', 'success');
        }
    };
    
    function generatePrivacyContent() {
        const title = document.querySelector('.privacy-hero h1').textContent;
        const lastUpdated = document.querySelector('.last-updated').textContent;
        const sections = [];
        
        document.querySelectorAll('.privacy-card').forEach(card => {
            const header = card.querySelector('h3').textContent;
            const content = card.querySelector('.privacy-card-body').innerText;
            sections.push(`${header}\n${'='.repeat(header.length)}\n${content}\n\n`);
        });
        
        return `${title}\n${'='.repeat(title.length)}\n${lastUpdated}\n\n${sections.join('')}`;
    }
    
    // =================================================
    // === Print Version ===
    // =================================================
    function initPrintVersion() {
        // Add print styles dynamically
        const style = document.createElement('style');
        style.media = 'print';
        style.textContent = `
            body {
                font-size: 12pt;
                line-height: 1.5;
                color: #000;
                background: #fff;
            }
            
            .header,
            .footer,
            .top-social-icons,
            .menu-btn,
            .search-bar,
            .mode-btn,
            .chat-toggle-btn,
            .whatsapp-chat,
            .cookie-banner,
            .privacy-toc,
            .download-section,
            .gdpr-notice .btn {
                display: none !important;
            }
            
            .privacy-card {
                break-inside: avoid;
                page-break-inside: avoid;
                border: none !important;
                box-shadow: none !important;
                margin: 20px 0;
            }
            
            .privacy-card-header {
                background: none !important;
                color: #000 !important;
            }
            
            .section-number {
                color: #666 !important;
            }
            
            a {
                color: #000 !important;
                text-decoration: underline;
            }
            
            a::after {
                content: " (" attr(href) ")";
                font-size: 10pt;
            }
        `;
        document.head.appendChild(style);
    }
    
    // =================================================
    // === Notification System ===
    // =================================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `privacy-notification ${type}`;
        
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});

// =================================================
// === Add CSS to style.css ===
// =================================================