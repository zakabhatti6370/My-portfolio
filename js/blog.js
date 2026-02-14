/* ================================================= */
/* === Blog Page - Beautiful Interactive JavaScript === */
/* === Created by ZakaUllah === */
/* ================================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =================================================
    // === Initialize All Blog Features ===
    // =================================================
    initCategoryFilters();
    initPagination();
    initProjectSearch();
    initSmoothScroll();
    initProjectHoverEffects();
    initCounters();
    initLazyLoading();
    initBackToTop();
    initShareButtons();
    
    // =================================================
    // === Category Filters with Animation ===
    // =================================================
    function initCategoryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!filterBtns.length || !projectCards.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Animate cards out
                projectCards.forEach(card => {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                });
                
                // Filter cards after animation
                setTimeout(() => {
                    projectCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        
                        if (filterValue === 'all' || filterValue === category) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Show no results message if needed
                    showNoResultsMessage();
                }, 300);
            });
        });
    }
    
    // =================================================
    // === Beautiful Pagination with Animation ===
    // =================================================
    function initPagination() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageNumbers = document.querySelectorAll('.page-number');
        const projectsGrid = document.getElementById('projectsGrid');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!prevBtn || !nextBtn || !pageNumbers.length) return;
        
        const cardsPerPage = 6;
        let currentPage = 1;
        let totalPages = Math.ceil(projectCards.length / cardsPerPage);
        
        function showPage(page) {
            // Validate page number
            if (page < 1 || page > totalPages) return;
            
            currentPage = page;
            
            // Update buttons state
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
            
            // Update page numbers
            pageNumbers.forEach((num, index) => {
                const pageNum = index + 1;
                num.classList.toggle('active', pageNum === currentPage);
            });
            
            // Animate cards out
            projectCards.forEach(card => {
                card.style.animation = 'fadeOut 0.2s ease forwards';
            });
            
            // Show cards for current page after animation
            setTimeout(() => {
                projectCards.forEach((card, index) => {
                    const start = (currentPage - 1) * cardsPerPage;
                    const end = start + cardsPerPage;
                    
                    if (index >= start && index < end) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                        card.style.animationDelay = `${(index - start) * 0.1}s`;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Scroll to top of projects grid smoothly
                if (projectsGrid) {
                    projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 200);
        }
        
        // Event listeners
        prevBtn.addEventListener('click', () => showPage(currentPage - 1));
        nextBtn.addEventListener('click', () => showPage(currentPage + 1));
        
        pageNumbers.forEach((num, index) => {
            num.addEventListener('click', () => showPage(index + 1));
        });
        
        // Initialize first page
        showPage(1);
    }
    
    // =================================================
    // === Project Search with Highlight ===
    // =================================================
    function initProjectSearch() {
        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        const searchForm = document.getElementById('searchForm');
        const mobileSearchForm = document.getElementById('mobileSearchForm');
        const noResults = document.getElementById('no-results-message');
        
        if (!searchInput && !mobileSearchInput) return;
        
        function highlightText(text, searchTerm) {
            if (!searchTerm) return text;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark class="highlight">$1</mark>');
        }
        
        function performSearch(searchTerm) {
            const projectCards = document.querySelectorAll('.project-card');
            let resultsFound = false;
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent || '';
                const description = card.querySelector('p')?.textContent || '';
                const techs = Array.from(card.querySelectorAll('.project-tech span'))
                    .map(span => span.textContent)
                    .join(' ');
                
                const searchableText = `${title} ${description} ${techs}`.toLowerCase();
                
                if (searchTerm === '' || searchableText.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                    
                    // Highlight title if search term exists
                    if (searchTerm && card.querySelector('h3')) {
                        const titleElement = card.querySelector('h3');
                        const originalTitle = titleElement.textContent;
                        titleElement.innerHTML = highlightText(originalTitle, searchTerm);
                    }
                    
                    resultsFound = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (noResults) {
                if (!resultsFound && searchTerm !== '') {
                    noResults.style.display = 'block';
                    noResults.innerHTML = `🔍 No projects found matching "<strong>${searchTerm}</strong>"`;
                } else {
                    noResults.style.display = 'none';
                }
            }
        }
        
        // Debounce function for better performance
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        const debouncedSearch = debounce(performSearch, 300);
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
            if (searchForm) {
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    performSearch(searchInput.value);
                });
            }
        }
        
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
            if (mobileSearchForm) {
                mobileSearchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    performSearch(mobileSearchInput.value);
                });
            }
        }
    }
    
    // =================================================
    // === Smooth Scroll with Progress Indicator ===
    // =================================================
    function initSmoothScroll() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
            progressBar.style.background = `linear-gradient(90deg, var(--primary-color), #ffc107)`;
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // =================================================
    // === Beautiful Hover Effects ===
    // =================================================
    function initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // 3D Tilt Effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Ripple effect on click
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size/2 + 'px';
                ripple.style.top = e.clientY - rect.top - size/2 + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // =================================================
    // === Animated Counters for Stats ===
    // =================================================
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statNumbers.length) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-target') || element.textContent);
                    
                    animateCounter(element, 0, target, 2000);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
        
        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                const currentValue = Math.floor(progress * (end - start) + start);
                element.textContent = currentValue + (end > 100 ? '' : '+');
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = end + (end > 100 ? '' : '+');
                }
            };
            
            window.requestAnimationFrame(step);
        }
    }
    
    // =================================================
    // === Lazy Loading with Blur Effect ===
    // =================================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Create a new image to preload
                    const tempImage = new Image();
                    tempImage.src = img.dataset.src;
                    
                    tempImage.onload = () => {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // =================================================
    // === Back to Top Button ===
    // =================================================
    function initBackToTop() {
        // Create back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =================================================
    // === Social Share Buttons ===
    // =================================================
    function initShareButtons() {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-button';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.setAttribute('aria-label', 'Share this page');
        document.body.appendChild(shareBtn);
        
        // Create share menu
        const shareMenu = document.createElement('div');
        shareMenu.className = 'share-menu';
        shareMenu.innerHTML = `
            <div class="share-menu-content">
                <h4>Share this page</h4>
                <div class="share-options">
                    <a href="#" class="share-option facebook" data-share="facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="share-option twitter" data-share="twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="share-option whatsapp" data-share="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="#" class="share-option linkedin" data-share="linkedin">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="share-option copy-link" data-share="copy">
                        <i class="fas fa-link"></i>
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(shareMenu);
        
        const shareOptions = shareMenu.querySelectorAll('.share-option');
        const currentUrl = encodeURIComponent(window.location.href);
        const currentTitle = encodeURIComponent(document.title);
        
        shareOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                
                let shareUrl = '';
                
                switch(option.dataset.share) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${currentTitle}%20${currentUrl}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            showNotification('Link copied to clipboard!');
                        });
                        return;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
                
                shareMenu.classList.remove('active');
            });
        });
        
        shareBtn.addEventListener('click', () => {
            shareMenu.classList.toggle('active');
        });
        
        // Close share menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!shareBtn.contains(e.target) && !shareMenu.contains(e.target)) {
                shareMenu.classList.remove('active');
            }
        });
    }
    
    // =================================================
    // === Helper Functions ===
    // =================================================
    function showNoResultsMessage() {
        const noResults = document.getElementById('no-results-message');
        const visibleCards = document.querySelectorAll('.project-card[style="display: block"]');
        
        if (noResults) {
            if (visibleCards.length === 0) {
                noResults.style.display = 'block';
                noResults.innerHTML = '😔 No projects found in this category';
            } else {
                noResults.style.display = 'none';
            }
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
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
// === Add Beautiful CSS Animations ===
// =================================================
const style = document.createElement('style');
style.textContent = `
    /* Scroll Progress Bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), #ffc107);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(13, 110, 253, 0.5);
    }
    
    /* Fade Animations */
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Ripple Effect */
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Search Highlight */
    mark.highlight {
        background: linear-gradient(120deg, #ffd700 0%, #ffed86 100%);
        color: #333;
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: 600;
    }
    
    .dark-mode mark.highlight {
        background: linear-gradient(120deg, #ffd700, #ffb347);
        color: #1a1a1a;
    }
    
    /* Back to Top Button */
    .back-to-top {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all var(--transition-normal);
        z-index: 9997;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 25px rgba(13, 110, 253, 0.4);
    }
    
    /* Share Button */
    .share-button {
        position: fixed;
        bottom: 90px;
        right: 80px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #25d366, #128c7e);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        z-index: 9997;
        transition: all var(--transition-normal);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .share-button:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
    }
    
    /* Share Menu */
    .share-menu {
        position: fixed;
        bottom: 150px;
        right: 20px;
        background: var(--card-bg);
        border-radius: 15px;
        box-shadow: var(--shadow-lg);
        padding: 20px;
        z-index: 9998;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all var(--transition-normal);
        min-width: 250px;
        border: 1px solid var(--border-color);
    }
    
    .share-menu.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .share-menu-content h4 {
        margin-bottom: 15px;
        color: var(--heading-color);
        text-align: center;
    }
    
    .share-options {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .share-option {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all var(--transition-fast);
        font-size: 1.1rem;
    }
    
    .share-option:hover {
        transform: translateY(-5px) scale(1.1);
    }
    
    .share-option.facebook {
        background: #1877f2;
    }
    
    .share-option.twitter {
        background: #1da1f2;
    }
    
    .share-option.whatsapp {
        background: #25d366;
    }
    
    .share-option.linkedin {
        background: #0077b5;
    }
    
    .share-option.copy-link {
        background: var(--secondary-color);
    }
    
    /* Notification */
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--card-bg);
        color: var(--text-color);
        padding: 12px 25px;
        border-radius: 50px;
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        transition: transform var(--transition-normal);
        font-weight: 500;
        border-left: 4px solid var(--primary-color);
        min-width: 250px;
        text-align: center;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .dark-mode .notification {
        background: var(--dark-card-bg);
        color: var(--dark-text-color);
    }
    
    /* Loading Skeleton */
    .skeleton {
        background: linear-gradient(90deg, 
            var(--border-color) 25%, 
            #e0e0e0 50%, 
            var(--border-color) 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    /* Image Load Effect */
    .project-card img {
        transition: all 0.5s ease;
    }
    
    .project-card img:not([src]) {
        opacity: 0;
    }
    
    .project-card img[src] {
        opacity: 1;
        animation: imageFadeIn 0.5s ease;
    }
    
    @keyframes imageFadeIn {
        from {
            opacity: 0;
            transform: scale(1.1);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Project Card Enhancements */
    .project-card {
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent);
        transition: left 0.5s ease;
        z-index: 1;
        pointer-events: none;
    }
    
    .project-card:hover::before {
        left: 100%;
    }
    
    .dark-mode .project-card::before {
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.05), 
            transparent);
    }
    
    /* Category Filter Animation */
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .filter-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
    }
    
    .filter-btn:active::before {
        width: 200px;
        height: 200px;
    }
    
    /* Page Number Animation */
    .page-number {
        position: relative;
        overflow: hidden;
    }
    
    .page-number::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--primary-color);
        transform: translateX(-50%);
        transition: width 0.3s ease;
    }
    
    .page-number:hover::after {
        width: 100%;
    }
    
    .page-number.active::after {
        width: 100%;
        background: white;
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .share-button {
            bottom: 80px;
            right: 20px;
        }
        
        .back-to-top {
            bottom: 80px;
            right: 80px;
        }
        
        .share-menu {
            right: 10px;
            left: 10px;
            width: auto;
        }
        
        .notification {
            width: 90%;
            min-width: auto;
        }
    }
    
    @media (max-width: 480px) {
        .share-button,
        .back-to-top {
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
        
        .share-option {
            width: 40px;
            height: 40px;
        }
    }
`;

document.head.appendChild(style);