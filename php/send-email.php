<?php
// =====================================================
// === Contact Form Configuration - FIXED ===
// =====================================================

// Prevent direct access
if (!defined('ACCESS_ALLOWED')) {
    die('Direct access not permitted');
}

// =====================================================
// === Email Settings ===
// =====================================================

// Your email address where you want to receive messages
define('TO_EMAIL', 'zakaullahbhatti7@gmail.com'); // CHANGE TO YOUR EMAIL

// Your name (will appear in email)
define('TO_NAME', 'ZakaUllah Bhatti');

// Email subject prefix
define('EMAIL_SUBJECT_PREFIX', '[Portfolio Contact]');

// =====================================================
// === SMTP Settings (For localhost/Gmail) ===
// =====================================================
// Uncomment and fill these for Gmail SMTP

define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'zakaullahbhatti7@gmail.com'); // Your Gmail
define('SMTP_PASS', 'your-app-password-here'); // App Password (16 digits)
define('SMTP_SECURE', 'tls');

// =====================================================
// === Security Settings ===
// =====================================================

// Secret key for CSRF protection
define('CSRF_SECRET', 'your-secret-key-here-change-this-' . uniqid());

// Rate limiting (max emails per IP per hour)
define('RATE_LIMIT', 5);

// Allowed domains for CORS (if using AJAX from different domain)
define('ALLOWED_ORIGIN', '*'); // Change to your domain in production

// =====================================================
// === Response Messages ===
// =====================================================

define('MSG_SUCCESS', 'Thank you for your message! I will get back to you within 24 hours.');
define('MSG_INVALID_REQUEST', 'Invalid request method.');
define('MSG_MISSING_FIELDS', 'Please fill in all required fields.');
define('MSG_INVALID_EMAIL', 'Please enter a valid email address.');
define('MSG_RATE_LIMIT', 'Too many messages from your IP. Please try again later.');
define('MSG_CSRF_ERROR', 'Security validation failed. Please refresh the page.');
define('MSG_SERVER_ERROR', 'Sorry, something went wrong. Please try again later.');

// =====================================================
// === Timezone ===
// =====================================================

date_default_timezone_set('Asia/Karachi'); // Change to your timezone
?>