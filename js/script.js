/* ================================================= */
/* === Main JavaScript File - Optimized Version === */
/* ================================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =================================================
    // === Initialize All Modules ===
    // =================================================
    initHeader();
    initMobileMenu();
    initSearch();
    initPopups();
    initDarkMode();
    initChatWidget();
    initCookieBanner();
    initSmoothScroll();
    
    // =================================================
    // === Header Scroll Effect ===
    // =================================================
    function initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Active link highlight
        const navLinks = document.querySelectorAll('.nav a');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }
    
    // =================================================
    // === Mobile Menu ===
    // =================================================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeBtn = document.querySelector('.mobile-menu .close-btn');
        const backdrop = document.getElementById('menuBackdrop');
        
        if (!menuBtn || !mobileMenu) return;
        
        // Create backdrop if it doesn't exist
        let menuBackdrop = backdrop;
        if (!menuBackdrop) {
            menuBackdrop = document.createElement('div');
            menuBackdrop.id = 'menuBackdrop';
            menuBackdrop.className = 'menu-backdrop';
            document.body.appendChild(menuBackdrop);
        }
        
        function openMenu() {
            mobileMenu.classList.add('show');
            menuBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            mobileMenu.classList.remove('show');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        menuBtn.addEventListener('click', openMenu);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
        
        menuBackdrop.addEventListener('click', closeMenu);
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                closeMenu();
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mobileMenu.classList.contains('show')) {
                closeMenu();
            }
        });
    }
    
    // =================================================
    // === Search Functionality with Debounce ===
    // =================================================
    function initSearch() {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const mobileSearchForm = document.getElementById('mobileSearchForm');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        const noResultsMessage = document.getElementById('no-results-message');
        const searchResultsContainer = document.getElementById('searchResults');
        
        // Debounce function to limit search frequency
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
        
        function filterCards(query) {
            const cards = document.querySelectorAll('.site-card');
            let resultsFound = false;
            const searchTerm = query.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all cards if search is empty
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
                if (searchResultsContainer) {
                    searchResultsContainer.style.display = 'none';
                }
                return;
            }
            
            cards.forEach(card => {
                const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const cardDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
                const cardFeatures = Array.from(card.querySelectorAll('.card-features li'))
                    .map(li => li.textContent.toLowerCase())
                    .join(' ');
                
                if (cardTitle.includes(searchTerm) || 
                    cardDescription.includes(searchTerm) || 
                    cardFeatures.includes(searchTerm)) {
                    card.style.display = 'flex';
                    resultsFound = true;
                    
                    // Highlight matching text (optional)
                    highlightText(card, searchTerm);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (noResultsMessage) {
                noResultsMessage.style.display = resultsFound ? 'none' : 'block';
            }
            
            if (searchResultsContainer) {
                searchResultsContainer.style.display = resultsFound ? 'none' : 'block';
            }
        }
        
        // Simple highlight function
        function highlightText(card, term) {
            // Implementation depends on requirements
            // Can be expanded later
        }
        
        const debouncedFilter = debounce(filterCards, 300);
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                filterCards(searchInput.value);
            });
            
            searchInput.addEventListener('input', (e) => {
                debouncedFilter(e.target.value);
            });
        }
        
        if (mobileSearchForm && mobileSearchInput) {
            mobileSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                filterCards(mobileSearchInput.value);
            });
            
            mobileSearchInput.addEventListener('input', (e) => {
                debouncedFilter(e.target.value);
            });
        }
    }
    
    // =================================================
    // === Popup Functions (Global) ===
    // =================================================
    function initPopups() {
        // Make functions global
        window.openDemo = function(url) {
            const demoPreview = document.getElementById('demoPreview');
            const demoFrame = document.getElementById('demoFrame');
            
            if (demoPreview && demoFrame) {
                demoFrame.src = url;
                demoPreview.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeDemo = function() {
            const demoPreview = document.getElementById('demoPreview');
            const demoFrame = document.getElementById('demoFrame');
            
            if (demoPreview && demoFrame) {
                demoFrame.src = '';
                demoPreview.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
        
        window.openBuyWithPrice = function(price) {
            const buyPopup = document.getElementById('buyPopup');
            const priceElement = document.getElementById('itemPriceDisplay');
            
            if (buyPopup && priceElement) {
                priceElement.textContent = `Price: $${price}`;
                buyPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeBuy = function() {
            const buyPopup = document.getElementById('buyPopup');
            
            if (buyPopup) {
                buyPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
        };
        
        // Close popups when clicking outside
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    if (popup.id === 'demoPreview') {
                        closeDemo();
                    } else if (popup.id === 'buyPopup') {
                        closeBuy();
                    }
                }
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const visiblePopups = document.querySelectorAll('.popup[style*="display: flex"]');
                visiblePopups.forEach(popup => {
                    if (popup.id === 'demoPreview') {
                        closeDemo();
                    } else if (popup.id === 'buyPopup') {
                        closeBuy();
                    }
                });
            }
        });
    }
    
    // =================================================
    // === Dark Mode with Local Storage ===
    // =================================================
    function initDarkMode() {
        const toggleBtn = document.getElementById('toggleMode');
        if (!toggleBtn) return;
        
        // Check for saved preference
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial state
        if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<span class="mode-icon">☾</span> Light Mode';
        }
        
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
            
            // Update button text
            toggleBtn.innerHTML = isDarkMode 
                ? '<span class="mode-icon">☾</span> Light Mode'
                : '<span class="mode-icon">☼</span> Dark Mode';
        });
    }
    
    // =================================================
    // === Chat Widget ===
    // =================================================
    function initChatWidget() {
        const chatToggleBtn = document.getElementById('chatToggleBtn');
        const chatWidget = document.getElementById('chatWidget');
        const chatCloseBtn = chatWidget?.querySelector('.close-btn');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const chatBody = document.getElementById('chatBody');
        
        if (!chatToggleBtn || !chatWidget || !chatCloseBtn || !chatBody) return;
        
        // Try to load sound, but don't break if not available
        let messageSound = null;
        try {
            messageSound = new Audio();
            messageSound.src = 'mp3/message-sent.mp3';
        } catch (e) {
            console.log('Audio not supported or file missing');
        }
        
        function playSound() {
            if (messageSound) {
                messageSound.play().catch(() => {});
            }
        }
        
        function addMessage(text, isUser = true) {
            const msgDiv = document.createElement('div');
            msgDiv.textContent = text;
            msgDiv.classList.add(isUser ? 'user-msg' : 'agent-msg');
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            chatBody.appendChild(indicator);
            chatBody.scrollTop = chatBody.scrollHeight;
            return indicator;
        }
        
        // Add welcome message
        addMessage("Hello! How can I help you today?", false);
        
        chatToggleBtn.addEventListener('click', () => {
            chatWidget.classList.add('visible');
            chatToggleBtn.classList.add('hidden');
            if (chatInput) chatInput.focus();
        });

        chatCloseBtn.addEventListener('click', () => {
            chatWidget.classList.remove('visible');
            chatToggleBtn.classList.remove('hidden');
        });

        function sendMessage() {
            if (!chatInput || !sendBtn) return;
            
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                playSound();
                
                // Show typing indicator
                const indicator = showTypingIndicator();
                
                // Simulate response after delay
                setTimeout(() => {
                    indicator.remove();
                    addMessage("Thank you for your message. I'll get back to you shortly!", false);
                    playSound();
                }, 1500);
            }
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }
    
    // =================================================
    // === Cookie Banner ===
    // =================================================
    function initCookieBanner() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const rejectBtn = document.getElementById('reject-cookies');
        
        if (!cookieBanner) return;
        
        function setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
        }

        function getCookie(name) {
            const nameEQ = `${name}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        
        // Check if user already made a choice
        const consent = getCookie('cookie_consent');
        
        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 1000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                setCookie('cookie_consent', 'accepted', 30);
                cookieBanner.style.display = 'none';
                loadGoogleAds();
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                setCookie('cookie_consent', 'rejected', 30);
                cookieBanner.style.display = 'none';
            });
        }
    }
    
    // Load Google Ads (only if accepted)
    function loadGoogleAds() {
        // Only load if consent given
        const consent = getCookie('cookie_consent');
        if (consent !== 'accepted') return;
        
        // Load ads script
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_CLIENT_ID';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        // Initialize ads
        setTimeout(() => {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log('AdSense not available');
            }
        }, 1000);
    }
    
    // =================================================
    // === Smooth Scrolling ===
    // =================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
    
    // =================================================
    // === Helper Functions ===
    // =================================================
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});

// =================================================
// === Error Handling & Performance Monitoring ===
// =================================================
window.addEventListener('error', function(e) {
    console.log('Error caught:', e.message);
    // You can send errors to a logging service here
});

// Detect slow connections
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData || connection.effectiveType.includes('2g')) {
        // Load low-res images or disable animations
        document.body.classList.add('slow-connection');
    }
}

// Lazy loading for images (fallback for older browsers)
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    // You can add a library like lazysizes here
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(registrationError => {
            console.log('SW registration failed:', registrationError);
        });
    });
}