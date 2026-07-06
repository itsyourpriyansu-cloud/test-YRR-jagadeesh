/* ==========================================================================
   FORM VALIDATION & SIMULATED INCOMING EMAIL CONFIRMATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const formGroups = contactForm.querySelectorAll('.form-group');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const phoneInput = document.getElementById('form-phone');
  const messageInput = document.getElementById('form-message');
  
  const inboxOverlay = document.getElementById('inbox-overlay');
  const inboxClose = document.getElementById('inbox-close');
  const simulatedMailbox = document.getElementById('simulated-mailbox');

  // Input elements event listeners for real-time validation
  nameInput.addEventListener('blur', () => validateField(nameInput, checkName));
  nameInput.addEventListener('input', () => validateField(nameInput, checkName));

  emailInput.addEventListener('blur', () => validateField(emailInput, checkEmail));
  emailInput.addEventListener('input', () => validateField(emailInput, checkEmail));

  phoneInput.addEventListener('blur', () => validateField(phoneInput, checkPhone));
  phoneInput.addEventListener('input', () => validateField(phoneInput, checkPhone));

  messageInput.addEventListener('blur', () => validateField(messageInput, checkMessage));
  messageInput.addEventListener('input', () => validateField(messageInput, checkMessage));

  // Field Validation Helpers
  function setFieldSuccess(input) {
    const group = input.closest('.form-group');
    group.classList.remove('error');
    group.classList.add('success');
  }

  function setFieldError(input, message) {
    const group = input.closest('.form-group');
    group.classList.remove('success');
    group.classList.add('error');
    const errorMsg = group.querySelector('.form-error-msg');
    if (errorMsg) {
      errorMsg.textContent = message;
    }
  }

  function validateField(input, validationFn) {
    const result = validationFn(input.value.trim());
    if (result.isValid) {
      setFieldSuccess(input);
      return true;
    } else {
      setFieldError(input, result.message);
      return false;
    }
  }

  // Individual field rules
  function checkName(val) {
    if (val === '') return { isValid: false, message: 'Please enter your name.' };
    if (val.length < 2) return { isValid: false, message: 'Name must be at least 2 characters.' };
    return { isValid: true };
  }

  function checkEmail(val) {
    if (val === '') return { isValid: false, message: 'Please enter your email.' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return { isValid: false, message: 'Please enter a valid email address.' };
    return { isValid: true };
  }

  function checkPhone(val) {
    if (val === '') return { isValid: false, message: 'Please enter your phone number.' };
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!phoneRegex.test(val)) return { isValid: false, message: 'Please enter a valid phone number (10+ digits).' };
    return { isValid: true };
  }

  function checkMessage(val) {
    if (val === '') return { isValid: false, message: 'Please write a brief message.' };
    if (val.length < 10) return { isValid: false, message: 'Message must be at least 10 characters.' };
    return { isValid: true };
  }

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, checkName);
    const isEmailValid = validateField(emailInput, checkEmail);
    const isPhoneValid = validateField(phoneInput, checkPhone);
    const isMessageValid = validateField(messageInput, checkMessage);

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      const clientName = nameInput.value.trim();
      const clientEmail = emailInput.value.trim();
      
      // Submit success: show overlay & generate simulated email confirmation toast
      showEmailConfirmation(clientName, clientEmail);
      
      // Reset form states
      contactForm.reset();
      formGroups.forEach(g => {
        g.classList.remove('success');
        g.classList.remove('error');
      });
    }
  });

  // Simulated Inbox Overlay trigger
  function showEmailConfirmation(name, email) {
    // Show glass overlay modal
    inboxOverlay.classList.add('active');
    
    // Clear previous simulation contents
    simulatedMailbox.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;" id="inbox-loader">
        <p style="font-size: 0.95rem;">Checking for secure SMTP confirmation handshake...</p>
        <div class="shimmer-dots" style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
          <span class="dot-shimmer" style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-green-light); animation: bounce-dot 1.2s infinite ease-in-out;"></span>
          <span class="dot-shimmer" style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-blue); animation: bounce-dot 1.2s infinite ease-in-out 0.2s;"></span>
          <span class="dot-shimmer" style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-yellow); animation: bounce-dot 1.2s infinite ease-in-out 0.4s;"></span>
        </div>
      </div>
    `;

    // Bounce animation rule setup dynamically
    if (!document.getElementById('bounce-dot-keyframes')) {
      const style = document.createElement('style');
      style.id = 'bounce-dot-keyframes';
      style.textContent = `
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `;
      document.head.appendChild(style);
    }

    // Delay simulated email arriving to represent real networking
    setTimeout(() => {
      const loader = document.getElementById('inbox-loader');
      if (loader) loader.remove();

      const dateStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // HTML representation of virtual email toast
      const emailToast = document.createElement('div');
      emailToast.className = 'email-notification-toast';
      emailToast.style.opacity = '0';
      emailToast.style.transform = 'translateY(15px)';
      emailToast.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      emailToast.innerHTML = `
        <div class="email-avatar">YR</div>
        <div class="email-details" style="flex-grow: 1;">
          <div class="email-meta">
            <span class="email-sender">Yoshitha's Real Rise</span>
            <span class="email-time">${dateStr}</span>
          </div>
          <span class="email-subject">Meeting Scheduled Successfully!</span>
          <p class="email-snippet" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
            Hello <strong>${name}</strong>,<br><br>
            Thank you for reaching out to the partners at Yoshitha's Real Rise. We have received your query from <strong>${email}</strong> and successfully mapped it to our primary consultant network.<br><br>
            One of our premium real estate specialists will review your application parameters and connect with you at your provided telephone number shortly.<br><br>
            <em>Warm Regards,<br>Partner Operations Team<br>Yoshitha's Real Rise</em>
          </p>
        </div>
      `;

      simulatedMailbox.appendChild(emailToast);
      
      // Fade in using CSS transition
      setTimeout(() => {
        emailToast.style.opacity = '1';
        emailToast.style.transform = 'translateY(0)';
      }, 50);

    }, 2200);
  }

  // Dismiss overlay
  inboxClose.addEventListener('click', () => {
    inboxOverlay.classList.remove('active');
  });

  inboxOverlay.addEventListener('click', (e) => {
    if (e.target === inboxOverlay) {
      inboxOverlay.classList.remove('active');
    }
  });
});
