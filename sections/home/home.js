$(document).ready(function () {
    console.log("home.js: Home section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("home.js: Navbar menu toggled.");
    });

    // Typed.js effect for home section
    var typed = new Typed(".typing-text", {
        strings: [
            "Flutter development",
            "Frontend development",
            "Backend development",
            "Web designing",
            "Android development",
            "Web development",
            "Competitive programming",
            "UI/UX design",
            "Social media management",
            "Nature photography",
            "Portrait photography",
            "Sports"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
    console.log("home.js: Typed.js effect initialized.");

    // ScrollReveal animations specific to home section
    // 'srtop' is globally available from common.js
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.home-content .content h2', { delay: 200 });
        srtop.reveal('.home-content .content p', { delay: 200 });
        srtop.reveal('.home-content .content .btn', { delay: 200 });
        srtop.reveal('.home-content .image', { delay: 400 });
        srtop.reveal('.home-content .socials .social-icons li', { interval: 100 });
        console.log("home.js: ScrollReveal animations applied.");
    } else {
        console.warn("home.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    // --- Particles.js Initialization (Moved to home.js) ---
    // Ensure particles.js is initialized only when the home section is loaded
    console.log("home.js: Initializing particles.js for home section.");
    // Destroy previous particles.js instance if it exists (for navigation scenarios)
    if (window.pJSDom && window.pJSDom.length > 0) {
        console.log("home.js: Destroying previous particles.js instance.");
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    particlesJS('particles-js',
        {
            "particles": {
                "number": {
                    "value": 199, // Increased number of particles for more collision feel
                    "density": {
                        "enable": true,
                        "value_area": 1500 // Increased density area for more particles
                    }
                },
                "color": {
                    "value": "#FFD700" // Changed particle color to Gold for stars
                },
                "shape": {
                    "type": "star", // Changed shape to 'star'
                    "stroke": {
                        "width": 0, // No stroke needed for the star shape, or set to a small value for an outline
                        "color": "#FFA500"
                    }
                    // 'polygon' and 'image' configurations are removed as they are not used for 'star' type
                },
                "opacity": {
                    "value": 0.8, // Slightly increased opacity
                    "random": true, // Random opacity for a dynamic look
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 8, // Adjusted default size for stars
                    "random": true, // Random size for a dynamic look
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 180, // Increased distance for lines between particles
                    "color": "#FFA500", // Line color: Orange (matching theme)
                    "opacity": 0.5, // Opacity of lines
                    "width": 1.5 // Width of lines
                },
                "move": {
                    "enable": true,
                    "speed": 4, // Adjusted movement speed
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "bounce", // Changed to "bounce" for more collision with edges
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse" // Changed onhover mode to "repulse" for smoother interaction
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // Added onclick mode to "push" new particles
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 250,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 150, // Adjusted repulse distance for smoother effect
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4 // Number of particles to push on click
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        }
    );
    console.log("home.js: particles.js fully initialized.");
});