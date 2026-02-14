// Replace the existing submitForm function with this:

async function submitForm(formData) {
    const response = await fetch('php/send-email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
}
/* ================================================= */
/* === Contact Page - Beautiful Interactive JavaScript === */
/* === Created by ZakaUllah === */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =================================================
    // === Initialize All Contact Features ===
    // =================================================
    initContactForm();
    initFaqAccordion();
    initCopyEmail();
    initFormAnimations();
    initLiveValidation();
    initMapInteractions();
    
    // =================================================
    // === Contact Form with Validation & Animation ===
    // =================================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const formWrapper = document.querySelector('.contact-form-wrapper');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                privacy: document.getElementById('privacy').checked
            };
            
            try {
                // Simulate form submission (replace with actual API call)
                await submitForm(formData);
                
                // Hide form, show success message with animation
                formWrapper.classList.add('form-submitted');
                setTimeout(() => {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.classList.add('show');
                }, 300);
                
                // Reset form
                form.reset();
                
                // Show success notification
                showNotification('Message sent successfully!', 'success');
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                setLoadingState(false);
            }
        });
        
        // Reset button functionality
        const resetBtn = form.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                form.reset();
                clearErrors();
                showNotification('Form cleared', 'info');
            });
        }
    }
    
    // Simulate form submission (replace with actual API)
    async function submitForm(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 2000);
        });
    }
    
    // =================================================
    // === Form Validation ===
    // =================================================
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const privacy = document.getElementById('privacy');
        
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (!name.value.trim()) {
            showError('name', 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 3) {
            showError('name', 'Name must be at least 3 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value) {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // Validate privacy
        if (!privacy.checked) {
            showError('privacy', 'You must agree to the privacy policy');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const input = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (input) {
            input.classList.add('error');
            
            // Shake animation
            input.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }
    
    // =================================================
    // === Live Validation on Input ===
    // =================================================
    function initLiveValidation() {
        const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(`${this.id}Error`);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.id === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        showError('email', 'Invalid email format');
                    }
                }
            });
        });
    }
    
    // =================================================
    // === Loading State ===
    // =================================================
    function setLoadingState(isLoading) {
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const loader = submitBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            btnText.style.opacity = '0';
            btnIcon.style.opacity = '0';
            loader.style.display = 'block';
            submitBtn.disabled = true;
        } else {
            btnText.style.opacity = '1';
            btnIcon.style.opacity = '1';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    
    // =================================================
    // === Reset Form Function ===
    // =================================================
    window.resetForm = function() {
        const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const formWrapper = document.querySelector('.contact-form-wrapper');
        
        formWrapper.classList.remove('form-submitted');
        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset();
        clearErrors();
        
        // Smooth scroll to form
        formWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    // =================================================
    // === Copy Email Function ===
    // =================================================
    function initCopyEmail() {
        window.copyEmail = function() {
            const email = 'zakaullahbhatti7@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
                
                // Animate copy button
                const copyBtn = document.querySelector('.copy-email');
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Email';
                }, 2000);
                
            }).catch(err => {
                console.error('Failed to copy:', err);
                showNotification('Failed to copy email', 'error');
            });
        };
    }
    
    // =================================================
    // === FAQ Accordion ===
    // =================================================
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i');
            
            // Set initial state
            answer.style.display = 'none';
            
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').style.display = 'none';
                        otherItem.querySelector('.faq-icon i').className = 'fas fa-plus';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                if (isOpen) {
                    answer.style.display = 'none';
                    icon.className = 'fas fa-plus';
                    item.classList.remove('active');
                } else {
                    answer.style.display = 'block';
                    icon.className = 'fas fa-minus';
                    item.classList.add('active');
                    
                    // Animate answer
                    answer.style.animation = 'slideDown 0.3s ease';
                }
            });
        });
    }
    
    // =================================================
    // === Form Animations ===
    // =================================================
    function initFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.animationDelay = `${index * 0.1}s`;
            observer.observe(group);
        });
        
        // Input focus animations
        const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check initial state
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // =================================================
    // === Map Interactions ===
    // =================================================
    function initMapInteractions() {
        const mapContainer = document.querySelector('.map-container');
        
        if (!mapContainer) return;
        
        mapContainer.addEventListener('mouseenter', () => {
            mapContainer.style.transform = 'scale(1.02)';
        });
        
        mapContainer.addEventListener('mouseleave', () => {
            mapContainer.style.transform = 'scale(1)';
        });
    }
    
    // =================================================
    // === Notification System ===
    // =================================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotif = document.querySelector('.contact-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        
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
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
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
    /* Contact Hero Section */
    .contact-hero {
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        padding: 80px 0;
        color: white;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .contact-hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L100 100 M100 0 L0 100" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>');
        opacity: 0.1;
        animation: moveLines 20s linear infinite;
    }
    
    @keyframes moveLines {
        from { transform: translateX(-100%) translateY(-100%); }
        to { transform: translateX(100%) translateY(100%); }
    }
    
    .contact-hero h1 {
        font-size: 3rem;
        margin-bottom: 20px;
        color: white;
        animation: fadeInDown 0.8s ease;
    }
    
    .contact-hero h1 span {
        color: #ffc107;
        position: relative;
        display: inline-block;
    }
    
    .contact-hero h1 span::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #ffc107;
        border-radius: 3px;
        animation: expandWidth 0.8s ease 0.3s forwards;
        transform: scaleX(0);
    }
    
    @keyframes expandWidth {
        to { transform: scaleX(1); }
    }
    
    .hero-description {
        font-size: 1.2rem;
        max-width: 700px;
        margin: 0 auto 40px;
        opacity: 0.95;
        line-height: 1.8;
        animation: fadeInUp 0.8s ease 0.2s both;
    }
    
    /* Contact Info Cards */
    .contact-info-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin: -50px auto 60px;
        position: relative;
        z-index: 10;
        max-width: 1200px;
        padding: 0 20px;
    }
    
    .info-card {
        background: var(--card-bg);
        padding: 40px 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        border: 1px solid var(--border-color);
    }
    
    .info-card:nth-child(1) { animation-delay: 0.2s; }
    .info-card:nth-child(2) { animation-delay: 0.4s; }
    .info-card:nth-child(3) { animation-delay: 0.6s; }
    
    .info-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(90deg, var(--primary-color), #ffc107);
        transform: scaleX(0);
        transition: transform var(--transition-normal);
    }
    
    .info-card:hover {
        transform: translateY(-15px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .info-card:hover::before {
        transform: scaleX(1);
    }
    
    .info-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 25px;
        font-size: 2rem;
        color: white;
        transition: all var(--transition-normal);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(13, 110, 253, 0); }
        100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
    }
    
    .info-card:hover .info-icon {
        transform: rotateY(360deg);
        background: linear-gradient(135deg, #ffc107, var(--primary-color));
    }
    
    .info-card h3 {
        margin-bottom: 10px;
        color: var(--heading-color);
        font-size: 1.3rem;
    }
    
    .info-card p {
        color: var(--text-color);
        margin-bottom: 20px;
        font-size: 0.95rem;
    }
    
    .info-link {
        display: block;
        padding: 12px 20px;
        margin: 10px 0;
        background: rgba(13, 110, 253, 0.1);
        color: var(--primary-color);
        text-decoration: none;
        border-radius: 10px;
        transition: all var(--transition-fast);
        font-weight: 500;
    }
    
    .info-link:hover {
        background: var(--primary-color);
        color: white;
        transform: translateX(5px);
    }
    
    .info-link.whatsapp {
        background: rgba(37, 211, 102, 0.1);
        color: #25d366;
    }
    
    .info-link.whatsapp:hover {
        background: #25d366;
        color: white;
    }
    
    .info-text {
        display: block;
        padding: 8px 0;
        color: var(--text-color);
        font-size: 0.95rem;
    }
    
    .info-text i {
        margin-right: 8px;
        color: var(--primary-color);
    }
    
    /* Contact Form Wrapper */
    .contact-form-wrapper {
        background: var(--card-bg);
        border-radius: 30px;
        padding: 50px;
        box-shadow: var(--shadow-lg);
        margin-bottom: 60px;
        border: 1px solid var(--border-color);
        position: relative;
        overflow: hidden;
    }
    
    .contact-form-wrapper::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(13,110,253,0.05) 0%, transparent 70%);
        animation: rotate 30s linear infinite;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .form-header {
        text-align: center;
        margin-bottom: 40px;
        position: relative;
        z-index: 1;
    }
    
    .form-header h2 {
        font-size: 2.2rem;
        color: var(--heading-color);
        margin-bottom: 10px;
    }
    
    .form-header h2 span {
        color: var(--primary-color);
    }
    
    .form-header p {
        color: var(--text-color);
        font-size: 1.1rem;
    }
    
    /* Form Styles */
    .contact-form {
        position: relative;
        z-index: 1;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .form-group {
        position: relative;
        margin-bottom: 25px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: var(--heading-color);
        font-weight: 500;
        font-size: 0.95rem;
        transition: all var(--transition-fast);
    }
    
    .form-group label i {
        margin-right: 8px;
        color: var(--primary-color);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 15px 18px;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        background: var(--body-bg);
        color: var(--text-color);
        font-size: 1rem;
        transition: all var(--transition-fast);
        outline: none;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
        transform: translateY(-2px);
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateX(5px);
    }
    
    /* Error States */
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 5px;
        display: none;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Checkbox */
    .form-checkbox {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
    
    .form-checkbox input {
        width: auto;
        margin-top: 3px;
    }
    
    .form-checkbox label {
        margin-bottom: 0;
        font-size: 0.95rem;
    }
    
    .form-checkbox a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .form-checkbox a:hover {
        text-decoration: underline;
    }
    
    /* Form Actions */
    .form-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
    }
    
    .submit-btn {
        flex: 2;
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        color: white;
        padding: 15px 30px;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-fast);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .submit-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.5s ease, height 0.5s ease;
    }
    
    .submit-btn:hover::before {
        width: 300px;
        height: 300px;
    }
    
    .submit-btn .btn-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .loader {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .reset-btn {
        flex: 1;
        background: transparent;
        color: var(--text-color);
        padding: 15px;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .reset-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        transform: translateY(-2px);
    }
    
    /* Success Message */
    .success-message {
        text-align: center;
        padding: 60px 40px;
        animation: scaleIn 0.5s ease;
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .success-icon {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #28a745, #20c997);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 30px;
        font-size: 3rem;
        color: white;
        animation: bounceIn 0.6s ease;
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .success-message h3 {
        font-size: 2rem;
        color: var(--heading-color);
        margin-bottom: 15px;
    }
    
    .success-message p {
        color: var(--text-color);
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
    
    /* Map Section */
    .map-section {
        margin-top: 60px;
    }
    
    .map-section h3 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 30px;
        color: var(--heading-color);
    }
    
    .map-section h3 span {
        color: var(--primary-color);
    }
    
    .map-container {
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
        height: 400px;
    }
    
    .map-container iframe {
        width: 100%;
        height: 100%;
        transition: all var(--transition-normal);
    }
    
    .map-container:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    /* FAQ Section */
    .faq-section {
        padding: 80px 0;
        background: var(--body-bg);
    }
    
    .faq-grid {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .faq-item {
        background: var(--card-bg);
        border-radius: 15px;
        margin-bottom: 15px;
        overflow: hidden;
        border: 1px solid var(--border-color);
        transition: all var(--transition-normal);
    }
    
    .faq-item:hover {
        border-color: var(--primary-color);
        transform: translateX(5px);
    }
    
    .faq-item.active {
        border-color: var(--primary-color);
        box-shadow: 0 5px 20px rgba(13, 110, 253, 0.1);
    }
    
    .faq-question {
        padding: 20px 25px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--card-bg);
    }
    
    .faq-question h3 {
        margin: 0;
        font-size: 1.1rem;
        color: var(--heading-color);
        transition: color var(--transition-fast);
    }
    
    .faq-question:hover h3 {
        color: var(--primary-color);
    }
    
    .faq-icon {
        width: 30px;
        height: 30px;
        background: rgba(13, 110, 253, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        transition: all var(--transition-fast);
    }
    
    .faq-item.active .faq-icon {
        background: var(--primary-color);
        color: white;
        transform: rotate(180deg);
    }
    
    .faq-answer {
        padding: 0 25px 20px;
        color: var(--text-color);
        line-height: 1.8;
        display: none;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* CTA Section */
    .cta-section {
        padding: 80px 0;
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        color: white;
        text-align: center;
    }
    
    .cta-content h2 {
        font-size: 2.5rem;
        margin-bottom: 15px;
        color: white;
    }
    
    .cta-content p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.95;
    }
    
    .cta-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    
    .cta-btn {
        padding: 15px 40px;
        font-size: 1.1rem;
        border-radius: 50px;
        transition: all var(--transition-fast);
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }
    
    .cta-btn.whatsapp {
        background: #25d366;
        color: white;
    }
    
    .cta-btn.whatsapp:hover {
        background: #128c7e;
        transform: translateY(-3px);
    }
    
    .cta-btn.email {
        background: white;
        color: var(--primary-color);
    }
    
    .cta-btn.email:hover {
        background: #ffc107;
        transform: translateY(-3px);
    }
    
    /* Notification */
    .contact-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        color: var(--text-color);
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform var(--transition-normal);
        border-left: 4px solid var(--primary-color);
        min-width: 300px;
    }
    
    .contact-notification.show {
        transform: translateX(0);
    }
    
    .contact-notification.success {
        border-left-color: #28a745;
    }
    
    .contact-notification.error {
        border-left-color: #dc3545;
    }
    
    .contact-notification i {
        font-size: 1.2rem;
    }
    
    .contact-notification.success i {
        color: #28a745;
    }
    
    .contact-notification.error i {
        color: #dc3545;
    }
    
    /* Dark Mode */
    .dark-mode .info-card,
    .dark-mode .contact-form-wrapper,
    .dark-mode .faq-item {
        background: var(--dark-card-bg);
    }
    
    .dark-mode .form-group input,
    .dark-mode .form-group select,
    .dark-mode .form-group textarea {
        background: var(--dark-body-bg);
        color: var(--dark-text-color);
        border-color: var(--dark-border-color);
    }
    
    .dark-mode .form-group label {
        color: var(--dark-heading-color);
    }
    
    .dark-mode .faq-question h3 {
        color: var(--dark-heading-color);
    }
    
    .dark-mode .faq-answer {
        color: var(--dark-text-color);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
        .contact-info-cards {
            grid-template-columns: repeat(2, 1fr);
            margin-top: 30px;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .cta-btn {
            width: 100%;
            max-width: 300px;
        }
    }
    
    @media (max-width: 768px) {
        .contact-hero h1 {
            font-size: 2rem;
        }
        
        .contact-info-cards {
            grid-template-columns: 1fr;
        }
        
        .contact-form-wrapper {
            padding: 30px 20px;
        }
        
        .form-header h2 {
            font-size: 1.8rem;
        }
        
        .form-actions {
            flex-direction: column;
        }
        
        .map-container {
            height: 300px;
        }
        
        .faq-question h3 {
            font-size: 1rem;
        }
    }
    
    @media (max-width: 480px) {
        .contact-hero h1 {
            font-size: 1.5rem;
        }
        
        .hero-description {
            font-size: 1rem;
        }
        
        .info-card {
            padding: 30px 20px;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            font-size: 2rem;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
        }
    }
`;

document.head.appendChild(style);