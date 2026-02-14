<?php
// =====================================================
// === Email Template for Contact Form ===
// =====================================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Message</title>
    <style>
        /* Reset styles */
        body, p, h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Main container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
        }
        
        /* Content card */
        .content-card {
            background: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        /* Header */
        .email-header {
            background: linear-gradient(135deg, #0d6efd 0%, #0056b3 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .email-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .email-header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .header-icon {
            width: 60px;
            height: 60px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
        }
        
        /* Body */
        .email-body {
            padding: 40px;
        }
        
        /* Field */
        .field {
            margin-bottom: 25px;
        }
        
        .field-label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #0d6efd;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        
        .field-label i {
            font-size: 16px;
        }
        
        .field-value {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            color: #2c3e50;
            font-size: 16px;
            line-height: 1.6;
            border-left: 4px solid #0d6efd;
        }
        
        .field-value.message {
            background: #fff;
            border: 2px solid #e9ecef;
        }
        
        /* Divider */
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #dee2e6, transparent);
            margin: 30px 0;
        }
        
        /* Meta info */
        .meta-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            font-size: 14px;
            color: #6c757d;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .meta-item i {
            color: #0d6efd;
        }
        
        /* Footer */
        .email-footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #0d6efd 0%, #0056b3 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(13,110,253,0.3);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(13,110,253,0.4);
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #6c757d;
            font-size: 20px;
            transition: color 0.3s;
        }
        
        .social-links a:hover {
            color: #0d6efd;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .email-body {
                padding: 20px;
            }
            
            .email-header h1 {
                font-size: 24px;
            }
            
            .meta-info {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="content-card">
            <!-- Header -->
            <div class="email-header">
                <div class="header-icon">
                    📬
                </div>
                <h1>New Contact Form Message</h1>
                <p>Someone just reached out through your portfolio</p>
            </div>
            
            <!-- Body -->
            <div class="email-body">
                <!-- Name -->
                <div class="field">
                    <div class="field-label">
                        <i>👤</i> SENDER NAME
                    </div>
                    <div class="field-value">
                        <?php echo $emailData['name']; ?>
                    </div>
                </div>
                
                <!-- Email -->
                <div class="field">
                    <div class="field-label">
                        <i>📧</i> EMAIL ADDRESS
                    </div>
                    <div class="field-value">
                        <a href="mailto:<?php echo $emailData['email']; ?>" style="color: #0d6efd; text-decoration: none;">
                            <?php echo $emailData['email']; ?>
                        </a>
                    </div>
                </div>
                
                <!-- Phone (if provided) -->
                <?php if ($emailData['phone'] !== 'Not provided'): ?>
                <div class="field">
                    <div class="field-label">
                        <i>📞</i> PHONE NUMBER
                    </div>
                    <div class="field-value">
                        <a href="tel:<?php echo $emailData['phone']; ?>" style="color: #0d6efd; text-decoration: none;">
                            <?php echo $emailData['phone']; ?>
                        </a>
                    </div>
                </div>
                <?php endif; ?>
                
                <!-- Subject -->
                <div class="field">
                    <div class="field-label">
                        <i>📌</i> SUBJECT
                    </div>
                    <div class="field-value">
                        <?php echo $emailData['subject']; ?>
                    </div>
                </div>
                
                <!-- Message -->
                <div class="field">
                    <div class="field-label">
                        <i>💬</i> MESSAGE
                    </div>
                    <div class="field-value message">
                        <?php echo $emailData['message']; ?>
                    </div>
                </div>
                
                <!-- Divider -->
                <div class="divider"></div>
                
                <!-- Meta Information -->
                <div class="meta-info">
                    <div class="meta-item">
                        <i>📅</i> <?php echo $emailData['date']; ?>
                    </div>
                    <div class="meta-item">
                        <i>🌐</i> IP: <?php echo $emailData['ip']; ?>
                    </div>
                    <div class="meta-item">
                        <i>📱</i> <?php echo $emailData['user_agent']; ?>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <a href="mailto:<?php echo $emailData['email']; ?>" class="btn">
                    ✉️ Reply to <?php echo $emailData['name']; ?>
                </a>
                
                <div class="social-links">
                    <a href="https://wa.me/923216926370" target="_blank">📱 WhatsApp</a>
                    <a href="https://github.com" target="_blank">💻 GitHub</a>
                    <a href="#" target="_blank">🔗 Portfolio</a>
                </div>
                
                <p style="margin-top: 20px; color: #6c757d; font-size: 12px;">
                    This email was sent from your portfolio contact form.<br>
                    © 2025 ZakaUllah Bhatti. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>