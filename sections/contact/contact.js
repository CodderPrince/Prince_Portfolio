$(document).ready(function () {
    console.log("contact.js: Contact section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("contact.js: Navbar menu toggled.");
    });

    // EmailJS form submission logic
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        console.log("contact.js: Contact form submission initiated.");

        const emailjsPublicKey = "_ZMnyCEtDHM_qjFpF";
        emailjs.init(emailjsPublicKey);
        console.log(`contact.js: EmailJS initialized with Public Key: ${emailjsPublicKey}`);

        const emailjsServiceId = 'service_r2wodwe';
        const emailjsTemplateId = 'template_4ljgfv7';

        console.log(`contact.js: Attempting to send form with Service ID: ${emailjsServiceId}, Template ID: ${emailjsTemplateId}`);

        emailjs.sendForm(emailjsServiceId, emailjsTemplateId, '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");

                // --- Tawk.to Integration on EmailJS Success ---
                const name = $("input[name='name']").val();
                const email = $("input[name='email']").val();
                const phone = $("input[name='phone']").val();
                const message = $("textarea[name='message']").val();

                if (typeof Tawk_API !== 'undefined' && Tawk_API.hasOwnProperty('setAttributes')) {
                    Tawk_API.setAttributes({
                        name: name,
                        email: email,
                        phone: phone
                    }, function(){
                        console.log("contact.js: Tawk_API.setAttributes called.");
                    });

                    Tawk_API.addEvent('EmailJS Form Submission', {
                        'name': name,
                        'email': email,
                        'phone': phone,
                        'message': message
                    });
                    Tawk_API.sendMessage(`New EmailJS Form Submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
                    console.log("contact.js: Tawk_API.sendMessage / addEvent called for form submission.");
                } else {
                    console.warn("contact.js: Tawk_API not available or setAttributes not found for integration.");
                }
                // --- END Tawk.to Integration ---

            }, function (error) {
                console.error('FAILED! EmailJS Error Details:', error);
                alert("Form Submission Failed! Try Again");
            });
    });

    // ScrollReveal animations specific to contact section
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.contact-content .container', { delay: 400 });
        srtop.reveal('.contact-content .container .form-group', { delay: 400 });
        console.log("contact.js: ScrollReveal animations applied.");
    } else {
        console.warn("contact.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // Re-highlight the active link in this section's navbar, if needed
    // Example:
    // $('.section-header .navbar ul li a').removeClass('active');
    // $('.section-header .navbar ul li a[data-section="contact"]').addClass('active');
});