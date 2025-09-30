$(document).ready(function () {
    console.log("experience-home.js: Home Experience section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("experience-home.js: Navbar menu toggled.");
    });

    // ScrollReveal animations specific to home page experience section
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.experience-home-content .heading', { delay: 200 });
        srtop.reveal('.experience-home-content .quote', { delay: 200 });
        srtop.reveal('.experience-home-content .timeline', { delay: 400 });
        srtop.reveal('.experience-home-content .timeline .container', { interval: 200 });
        srtop.reveal('.experience-home-content .morebtn', { delay: 600 });
        console.log("experience-home.js: ScrollReveal animations applied.");
    } else {
        console.warn("experience-home.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // Re-highlight the active link in this section's navbar, if needed
    // The active class is hardcoded in HTML for now, but if dynamic, this could update it.
});