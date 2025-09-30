$(document).ready(function () {
    console.log("about.js: About section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("about.js: Navbar menu toggled.");
    });

    // === THE SENTENCE CASE TEXT IS HERE ===
    // This string is now explicitly written in sentence case.
    const aboutText = `I'm Prince, a competitive programmer & Flutter developer currently studying Computer Science and Engineering (CSE) at Begum Rokeya University, Rangpur. I'm passionate about coding and always eager to learn new technologies. Right now, I'm exploring Dart, Flutter, and JavaFX. I'm also currently expanding my skill set by learning website development.`;

    const typedTextElement = $('#typed-about-text');
    let charIndex = 0;
    const typingSpeed = 30; // Milliseconds per character (adjust for desired speed)

    function typeAboutText() {
        if (charIndex < aboutText.length) {
            typedTextElement.text(typedTextElement.text() + aboutText.charAt(charIndex));
            charIndex++;
            setTimeout(typeAboutText, typingSpeed);
        } else {
            // Typing complete, remove cursor animation and keep border transparent
            typedTextElement.css({
                'border-right': 'none',
                'animation': 'none' // Ensure no other blinking animation is active
            });
        }
    }

    // Calculate typing duration to stagger subsequent animations
    const typingDuration = aboutText.length * typingSpeed;

    // Call typing function after a short initial delay to ensure page is ready
    // And apply the blinking cursor animation only after the element is visible
    setTimeout(() => {
        typedTextElement.css('visibility', 'visible'); // Make the span visible
        // Apply blinking cursor animation once the typing starts
        typedTextElement.css('animation', 'blink-caret .75s step-end infinite');
        typeAboutText();
    }, 1000); // Start typing 1 second after page load

    // ScrollReveal animations specific to about section
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.about-content .row .image', { delay: 200 });
        srtop.reveal('.about-content .content h3', { delay: 200 });
        srtop.reveal('.about-content .content .tag', { delay: 400 });

        // Adjust delays for elements appearing AFTER typing animation
        srtop.reveal('.about-content .content .box-container', { delay: typingDuration + 500 }); // +500ms after typing finishes
        srtop.reveal('.about-content .content .resumebtn', { delay: typingDuration + 700 }); // +700ms after typing finishes
        console.log("about.js: ScrollReveal animations applied.");
    } else {
        console.warn("about.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // Re-highlight the active link in this section's navbar, if needed
    // The active class is hardcoded in HTML for now, but if dynamic, this could update it.
});