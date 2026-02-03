// Smart Search Hub - Main JavaScript File with SweetAlert2

/**
 * Page refresh handler - refreshes page when navigating back
 */
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

/**
 * Clear all form inputs on page load
 */
window.addEventListener("pageshow", function () {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });
    
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        textarea.value = "";
    });
});

/**
 * Modal and form functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const floatingBtn = document.querySelector('.floating-button');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeForm');
    const sendBtn = document.getElementById('sendSuggestion');
    const successMessage = document.getElementById('successMessage');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    /**
     * Open modal function
     */
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    /**
     * Close modal function
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        successMessage.style.display = 'none';
    }
    
    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Clear form fields
     */
    function clearForm() {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }
    
    /**
     * Send suggestion via email
     */
    function sendSuggestion() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation - Check if all fields are filled
        if (!name || !email || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please fill in all fields!',
                confirmButtonColor: '#ffcc00',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address!',
                confirmButtonColor: '#ffcc00',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Create mailto link with proper formatting
const subject = encodeURIComponent(`Product Feedback | Smart Search Hub`);

const body = encodeURIComponent(
    `SMART SEARCH HUB – PRODUCT FEEDBACK\n` +
    `==================================\n\n` +

    `Submitted By:\n` +
    `• Name  : ${name}\n` +
    `• Email : ${email}\n\n` +

    `Feedback Details:\n` +
    `${message}\n\n` +

    `==================================\n` +
    `Generated automatically via Smart Search Hub\n`
);

        
        const mailto = `mailto:nelbanbetache@gmail.com?subject=${subject}&body=${body}`;

        // Try to open email client
        try {
            window.location.href = mailto;
            
            // Show success message with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your suggestion has been sent. Thank you!',
                confirmButtonColor: '#4CAF50',
                confirmButtonText: 'Great!',
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                // Clear form fields
                clearForm();
                // Close modal
                closeModal();
            });
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: 'Unable to open email client.<br>Please email us directly at:<br><strong>nelbanbetache@gmail.com</strong>',
                confirmButtonColor: '#ffcc00',
                confirmButtonText: 'OK'
            });
            console.error("Email error:", error);
        }
    }
    
    /**
     * Event Listeners
     */
    
    // Open modal when floating button is clicked
    floatingBtn.addEventListener('click', openModal);
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);
    
    // Send suggestion when send button is clicked
    sendBtn.addEventListener('click', sendSuggestion);
    
    // Close modal when clicking outside the form
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    /**
     * Form field focus management for better mobile experience
     */
    const formInputs = document.querySelectorAll('.suggestion-form input, .suggestion-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    /**
     * Allow Enter key to submit suggestion (except in textarea)
     */
    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            emailInput.focus();
        }
    });
    
    emailInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            messageInput.focus();
        }
    });
});
