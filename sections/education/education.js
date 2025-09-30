$(document).ready(function () {
    console.log("education.js: Education section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("education.js: Navbar menu toggled.");
    });

    // ScrollReveal animations specific to education section
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.education-content .qoute', { delay: 200 });
        srtop.reveal('.education-content .box', { interval: 200 });
        console.log("education.js: ScrollReveal animations applied.");
    } else {
        console.warn("education.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // Make education cards clickable
    $('.education-content .box').on('click', function() {
        const url = $(this).data('url');
        if (url && url !== '#') { // Check if URL exists and is not a placeholder
            window.open(url, '_blank'); // Open in a new tab
            console.log("education.js: Card clicked, navigating to:", url);
        } else {
            console.warn("education.js: Card clicked, but no valid URL found for this card.");
        }
    });


    // Re-highlight the active link in this section's navbar, if needed
    // The active class is hardcoded in HTML for now, but if dynamic, this could update it.
});