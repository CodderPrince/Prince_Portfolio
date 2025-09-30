$(document).ready(function () {
    console.log("experience-full.js: Full Experience section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("experience-full.js: Navbar menu toggled.");
    });

    // ScrollReveal animations specific to the full experience page
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.experience-full-content .quote', { delay: 200 });
        srtop.reveal('.experience-full-content .timeline', { delay: 400 });
        srtop.reveal('.experience-full-content .timeline .container', { interval: 200 }); // Adjusted interval for staggered reveal
        srtop.reveal('.experience-full-content .morebtn', { delay: 600 });
        console.log("experience-full.js: ScrollReveal animations applied.");
    } else {
        console.warn("experience-full.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // Re-highlight the active link in this section's navbar, if needed
    // The active class is hardcoded in HTML for now, but if dynamic, this could update it.
});