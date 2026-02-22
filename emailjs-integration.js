/**
 * EmailJS Integration for Event Booking Form
 * Handles form submission and email sending
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && emailConfig) {
        emailjs.init(emailConfig.publicKey);
        console.log('✅ EmailJS initialized');
    } else {
        console.error('❌ EmailJS library or config not loaded');
        return;
    }

    // Get form element
    const bookingForm = document.getElementById('eventBookingForm');
    if (!bookingForm) {
        console.warn('Event booking form not found');
        return;
    }

    // Set minimum date to 7 days from today
    function setMinimumBookingDate() {
        const dateInput = document.getElementById('eventDate');
        if (!dateInput) return;

        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 7);

        // Format date as YYYY-MM-DD for the min attribute
        const year = minDate.getFullYear();
        const month = String(minDate.getMonth() + 1).padStart(2, '0');
        const day = String(minDate.getDate()).padStart(2, '0');
        const minDateString = `${year}-${month}-${day}`;

        dateInput.setAttribute('min', minDateString);
        console.log(`✅ Event booking minimum date set to: ${minDateString}`);
    }

    // Apply minimum date restriction on form load
    setMinimumBookingDate();

    // Form validation - check required fields
    function validateRequiredFields(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Validate event date is at least 7 days from today
        const eventDateValue = document.getElementById('eventDate').value;
        if (eventDateValue) {
            const selectedDate = new Date(eventDateValue);
            const today = new Date();
            const minDate = new Date(today);
            minDate.setDate(minDate.getDate() + 7);

            // Set time to midnight for accurate comparison
            selectedDate.setHours(0, 0, 0, 0);
            minDate.setHours(0, 0, 0, 0);

            if (selectedDate < minDate) {
                isValid = false;
                document.getElementById('eventDate').classList.add('error');
                showErrorMessage('Bookings must be made at least 7 days in advance.');
            }
        }

        return isValid;
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.getElementById('successMessage');
        if (successDiv) {
            successDiv.style.display = 'block';
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Show error message
    function showErrorMessage(errorText = 'Failed to send booking request. Please try again.') {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-alert';
        errorDiv.style.cssText = `
            background: linear-gradient(135deg, #fff0f0 0%, #fff5f5 100%);
            border: 2px solid #d97a5a;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            animation: fadeInUp 0.5s ease-out;
        `;
        errorDiv.innerHTML = `
            <p style="font-size: 0.95rem; color: #d97a5a; line-height: 1.6; margin: 0;">
                <strong>⚠ Error:</strong> ${errorText}
            </p>
        `;

        bookingForm.parentNode.insertBefore(errorDiv, bookingForm);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Handle form submission
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate required fields
        if (!validateRequiredFields(this)) {
            console.warn('⚠ Please fill all required fields');
            showErrorMessage('Please fill all required fields.');
            return;
        }

        // Get submit button
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Send email using EmailJS sendForm
        emailjs.sendForm(
            emailConfig.serviceId,
            emailConfig.templateId,
            this
        ).then(
            function (response) {
                console.log('✅ Email sent successfully!', response);

                // Show success message
                showSuccessMessage();

                // Reset form
                bookingForm.reset();

                // Clear error styles
                bookingForm.querySelectorAll('.error').forEach(el => {
                    el.classList.remove('error');
                });

                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                // Hide success message after 4 seconds
                setTimeout(() => {
                    const successDiv = document.getElementById('successMessage');
                    if (successDiv) {
                        successDiv.style.display = 'none';
                    }
                }, 4000);
            },
            function (error) {
                console.error('❌ Email send failed:', error);

                // Show error message
                const errorMsg = error.text || 'Failed to send booking request. Please try again.';
                showErrorMessage(errorMsg);

                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        );
    });
});
