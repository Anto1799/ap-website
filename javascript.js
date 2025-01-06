(function() {
    emailjs.init("1ZTZHKgqIvfywv9MT");
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            emailjs.sendForm('service_lk0anmq', 'template_rgu20ch', this)
                .then(function(response) {
                    console.log('SUCCESS!', response);
                    alert('Message sent successfully!');
                    form.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Failed to send the message. Please try again.');
                });
        });
    }
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

document.querySelectorAll('.navbar a').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.navbar').classList.remove('active');
    });
});