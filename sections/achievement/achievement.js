$(document).ready(function () {
    console.log("achievement.js: Achievement section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("achievement.js: Navbar menu toggled.");
    });

    // ScrollReveal animations specific to achievement section
    if (typeof srtop !== 'undefined') {
        srtop.reveal('.achievement-content .heading', { delay: 200 });
        srtop.reveal('.achievement-content .achievement-categories', { delay: 400 });
        srtop.reveal('.achievement-content .achievement-btn', { interval: 150 });
        srtop.reveal('#gallery-output', { delay: 600 }); 
        console.log("achievement.js: ScrollReveal animations applied.");
    } else {
        console.warn("achievement.js: ScrollReveal (srtop) is not defined. Animations might not work.");
    }

    /**
     * Fetches data from a JSON file.
     * @param {string} filename The name of the JSON file (e.g., 'academic')
     */
    async function fetchAchievementData(filename) {
        // NOTE: New buttons "competitions" and "progress" will attempt to load
        // competitions.json and progress.json. Ensure these JSON files exist.
        const filePath = `../${filename}.json`;
        try {
            console.log(`achievement.js: Fetching data from ${filePath}`);
            let response = await fetch(filePath);
            if (!response.ok) {
                // If file not found, throw error (especially for new buttons)
                throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("achievement.js: Error fetching achievement data for", filename, err);
            return null;
        }
    }

    /**
     * Renders the achievement boxes, handling individual image loading.
     * @param {Array<Object>} achievements - Array of achievement objects.
     * @param {string} categoryName - The display name of the category.
     */
    function renderGallery(achievements, categoryName) {
        const galleryContainer = $('#gallery-output');
        
        // **UPDATED LINE:** Removed inline style to allow CSS to control color and size
        let galleryHTML = `<h3 class="details-heading">${categoryName} Achievements</h3>`;
        
        if (!achievements || achievements.length === 0) {
            galleryHTML += `
                <div class="default-message">
                    <h3 class="details-heading">No achievements found</h3>
                    <p>No achievements found for ${categoryName} yet. Check back soon!</p>
                </div>
            `;
            galleryContainer.html(galleryHTML);
            return;
        } 
        
        galleryHTML += `<div class="box-container">`;
        achievements.forEach(ach => {
            const viewLink = ach.links && ach.links.view ? ach.links.view : '#';
            
            // NOTE: The box-image-loader is included here and the image's src is set in JS
            galleryHTML += `
            <div class="box tilt">
                <!-- Individual Image Loader placeholder -->
                <div class="box-image-loader"><div class="spinner"></div></div> 

                <!-- Image starts hidden (opacity: 0 in CSS) and uses data-src -->
                <img draggable="false" data-src="${ach.image}" alt="${ach.name}" />
                
                <div class="content">
                    <div class="tag">
                        <h3>${ach.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${ach.desc}</p>
                        <div class="btns">
                            <a href="${viewLink}" class="btn-view" target="_blank"><i class="fas fa-external-link-alt"></i> View</a>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        galleryHTML += `</div>`;
        
        // 1. Render the HTML structure (with hidden images and visible loaders)
        galleryContainer.html(galleryHTML);
        
        console.log(`achievement.js: Gallery structure rendered for ${categoryName}.`);

        const imagePromises = [];

        // 2. Process image loading
        galleryContainer.find('.box img').each(function() {
            const $img = $(this);
            const imgElement = this;
            const $loader = $img.closest('.box').find('.box-image-loader');
            const imgSrc = $img.data('src');
            
            if (imgSrc) {
                // Create a Promise for each image load/error
                const imgLoadPromise = new Promise((resolve) => {
                    // Set the actual src to trigger browser loading
                    imgElement.src = imgSrc;

                    $img.on('load', function() {
                        // Image loaded successfully: hide loader, show image
                        $loader.remove();
                        $img.addClass('image-loaded'); 
                        resolve();
                    }).on('error', function() {
                        // Image failed to load: hide loader, remove image element, and resolve
                        console.warn('Image failed to load:', imgSrc);
                        $loader.remove(); 
                        $img.remove(); 
                        resolve();
                    });
                });
                imagePromises.push(imgLoadPromise);
            } else {
                // No image source found: remove loader and image element, resolve immediately
                $loader.remove();
                $img.remove();
                imagePromises.push(Promise.resolve());
            }
        });

        // 3. Re-initialize external libraries after all images are done
        Promise.all(imagePromises).then(() => {
            console.log(`achievement.js: All visible content loaded for ${categoryName}.`);

            // VanillaTilt re-initialization (if available)
            if (typeof initializeVanillaTilt === 'function') {
                initializeVanillaTilt();
                console.log("achievement.js: VanillaTilt re-initialized for new boxes.");
            }
            
            // ScrollReveal for new boxes
            if (typeof srtop !== 'undefined') {
                srtop.reveal('#gallery-output .box', { interval: 100, delay: 100 });
            }
        });
    }

    // Logic for handling button clicks and updating content
    $('.achievement-btn').on('click', async function(e) {
        e.preventDefault();
        const category = $(this).data('category'); 
        const categoryDisplayName = $(this).text().trim(); 

        const galleryContainer = $('#gallery-output');

        // STEP 1: Show Preloader while fetching data
        galleryContainer.html(`
            <div class="preloader default-message">
                <div class="spinner"></div>
                <h3>Loading Achievements...</h3>
                <p>Fetching data for ${categoryDisplayName}.</p>
            </div>
        `);
        
        $('.achievement-btn').removeClass('active-category');
        $(this).addClass('active-category');

        const data = await fetchAchievementData(category);
        
        if (data) {
            // STEP 2: Render Gallery. The image loading is handled internally in renderGallery
            renderGallery(data, categoryDisplayName);
        } else {
             galleryContainer.html(`
                <div class="default-message">
                    <h3 style="color: red;">Error!</h3>
                    <p>Could not load achievements for ${categoryDisplayName}. Please ensure the JSON file **../${category}.json** exists and is valid.</p>
                </div>
            `);
        }
    });

    // Optional: Auto-click the first button on load for immediate content display
    // $('.achievement-btn:first').click();
});