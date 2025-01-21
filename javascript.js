const contactForm = document.getElementById('contact-form');
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');


if (contactForm) {
    emailjs.init("1ZTZHKgqIvfywv9MT");
}

document.addEventListener('DOMContentLoaded', function() {
    if (!menuIcon || !navbar) return;


    const toggleMenu = (e) => {
        e?.stopPropagation();
        navbar.classList.toggle('active');
    };


    const closeMenuOutside = (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
        }
    };


    menuIcon.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOutside);


    navbar.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') {
            navbar.classList.remove('active');
        }
    });

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                emailjs.sendForm('service_lk0anmq', 'template_rgu20ch', form)
                    .then(function(response) {
                        console.log('SUCCESS!', response);
                        alert('Message sent successfully!');
                        form.reset();
                        clearErrors();
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('Failed to send message. Please try again.');
                    });
            }
        });
    }

    function validateForm() {
        let isValid = true;
        
        const name = form.querySelector('[name="from_name"]');
        const email = form.querySelector('[name="user_email"]');
        const subject = form.querySelector('[name="subject"]');
        const message = form.querySelector('[name="message"]');
        
        clearErrors();
        
        if (!name.value.trim()) {
            showError(name, 'name-error', 'Name is required');
            isValid = false;
        }
        
        if (!email.value.trim()) {
            showError(email, 'email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'email-error', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!subject.value.trim()) {
            showError(subject, 'subject-error', 'Subject is required');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showError(message, 'message-error', 'Message is required');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, errorId, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.visibility = 'visible';
        }
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const inputs = form.querySelectorAll('input, textarea');
        
        errorMessages.forEach(error => {
            error.style.visibility = 'hidden';
        });
        
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});