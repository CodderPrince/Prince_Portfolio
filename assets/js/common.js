// Global variables to hold ScrollReveal instance
let srtop; // Initialized once, then its reveal method can be called by section scripts.
let currentSectionCssLink = null;
let currentSectionJsScript = null; // Also track JS script for removal

$(document).ready(function () {
    console.log("common.js: Document ready, initializing global listeners and utilities.");

    // Scroll-top button visibility
    $(window).on('scroll load', function () {
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // Function to initialize/re-initialize ScrollReveal
    function initializeScrollReveal() {
        if (srtop && typeof srtop.destroy === 'function') {
            srtop.destroy();
            console.log("common.js: ScrollReveal instance destroyed.");
        }
        srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: false
        });
        console.log("common.js: ScrollReveal re-initialized. `reset` is set to `false`.");
    }

    // Function to initialize/re-initialize VanillaTilt
    function initializeVanillaTilt() {
        if (typeof VanillaTilt !== 'undefined' && VanillaTilt.hasOwnProperty('all')) {
            if (VanillaTilt.all().length > 0) {
                VanillaTilt.all().forEach(tilt => tilt.destroy());
                console.log("common.js: VanillaTilt instances destroyed.");
            }
        }
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
        console.log("common.js: VanillaTilt re-initialized on .tilt elements.");
    }

    // --- Core function to load sections dynamically with fade effect ---
    // --- Core function to load sections dynamically with fade effect + preloader ---
    async function loadSection(sectionName) {
        console.log(`common.js: Attempting to load section: ${sectionName}`);
        try {
            const mainContent = $('#main-content');
            const preloader = $('#page-preloader');

            if (!mainContent.length) {
                console.error("common.js: #main-content element not found. Cannot load sections.");
                window.location.href = './404.html';
                return;
            }

            // Show preloader
            preloader.addClass('active');

            // Fade out old content
            mainContent.fadeOut(200, async function () {
                try {
                    // Remove previous CSS/JS
                    if (currentSectionCssLink && currentSectionCssLink.parentNode) {
                        currentSectionCssLink.parentNode.removeChild(currentSectionCssLink);
                        currentSectionCssLink = null;
                    }
                    if (currentSectionJsScript && currentSectionJsScript.parentNode) {
                        currentSectionJsScript.parentNode.removeChild(currentSectionJsScript);
                        currentSectionJsScript = null;
                    }
                    mainContent.empty();

                    // Load new HTML
                    const htmlPath = `./sections/${sectionName}/${sectionName}.html`;
                    const htmlResponse = await fetch(htmlPath);
                    if (!htmlResponse.ok) throw new Error(`HTTP error! status: ${htmlResponse.status}`);
                    const htmlContent = await htmlResponse.text();
                    mainContent.html(htmlContent);

                    // Append new CSS
                    const cssLink = document.createElement('link');
                    cssLink.rel = 'stylesheet';
                    cssLink.href = `./sections/${sectionName}/${sectionName}.css`;
                    cssLink.className = 'section-css';
                    document.head.appendChild(cssLink);
                    currentSectionCssLink = cssLink;

                    // Function to finalize section load (init scripts, reveal, tilt, scroll)
                    const finalizeSection = () => {
                        initializeScrollReveal();
                        initializeVanillaTilt();
                        scrollToTopAfterLoad(sectionName);
                        mainContent.fadeIn(200); // Fade in after everything ready
                        preloader.removeClass('active'); // Hide preloader
                    };

                    // Load section JS
                    const script = document.createElement('script');
                    if (sectionName === 'home') {
                        const particlesScript = document.createElement('script');
                        particlesScript.src = `./sections/home/particles.min.js`;
                        particlesScript.onload = () => {
                            script.src = `./sections/${sectionName}/${sectionName}.js`;
                            script.onload = finalizeSection;
                            document.body.appendChild(script);
                            currentSectionJsScript = script;
                        };
                        document.body.appendChild(particlesScript);
                    } else {
                        script.src = `./sections/${sectionName}/${sectionName}.js`;
                        script.onload = finalizeSection;
                        document.body.appendChild(script);
                        currentSectionJsScript = script;
                    }
                } catch (innerError) {
                    console.error(`common.js: Failed during section content injection:`, innerError);
                    window.location.href = './404.html';
                }
            });

        } catch (error) {
            console.error(`common.js: Failed to load section ${sectionName}:`, error);
            window.location.href = './404.html';
        }
    }

    function scrollToTopAfterLoad(sectionId) {
        const loadedSectionElement = $(`#${sectionId}`);
        if (loadedSectionElement.length) {
            const headerHeight = loadedSectionElement.find('header').outerHeight() || 0;
            $('html, body').animate({ scrollTop: loadedSectionElement.offset().top - headerHeight }, 500);
            console.log(`common.js: Scrolled to section #${sectionId} with header offset of ${headerHeight}px.`);
        } else {
            $('html, body').animate({ scrollTop: 0 }, 500);
            console.log(`common.js: Loaded section element #${sectionId} not found, scrolled to top.`);
        }
    }

    // Delegated nav clicks
    $('body').on('click', 'a[data-section]', function (e) {
        e.preventDefault();
        const sectionToLoad = $(this).data('section');
        if (sectionToLoad) {
            loadSection(sectionToLoad);
            history.pushState(null, '', `/#${sectionToLoad}`);
            console.log(`common.js: Navigation triggered by data-section: ${sectionToLoad}`);
        }
    });

    // Initial section load
    const initialHash = window.location.hash.substring(1);
    const initialSection = initialHash || 'home';
    console.log(`common.js: Initial page load. Requesting section: ${initialSection}`);
    loadSection(initialSection);

    // Back/forward
    $(window).on('popstate', function () {
        const hash = window.location.hash.substring(1);
        const sectionToLoadOnPop = hash || 'home';
        console.log(`common.js: Popstate event detected. Loading section: ${sectionToLoadOnPop}`);
        loadSection(sectionToLoadOnPop);
    });

    // Disable dev mode
    document.onkeydown = function (e) {
        if (e.keyCode == 123) return false;
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    };

    // Tab visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Nahian Prince";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    // Tawk.to Live Chat
    if (!window.Tawk_API) {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/68d62a5b34eabc19222dcefd/1j629au6k'; // ✅ Your widget ID kept
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
        console.log("common.js: Tawk.to Live Chat initialized with new account.");
    }

    // Init ScrollReveal & VanillaTilt for pre-existing elements
    initializeScrollReveal();
    initializeVanillaTilt();

    // ✅ EmailJS (kept intact — do not delete your public key)
    if (typeof emailjs !== "undefined") {
        emailjs.init("YOUR_PUBLIC_KEY"); // 🔑 Replace with your real EmailJS key
        console.log("common.js: EmailJS initialized.");
    }
});
