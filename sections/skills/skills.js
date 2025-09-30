$(document).ready(function () {
    console.log("skills.js: Skills section script loaded.");

    // Navbar menu toggle specific to this section's header
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("skills.js: Navbar menu toggled.");
    });

    let allSkillsCategories = {}; // Global variable to store all fetched skills categorized

    async function fetchData() {
        try {
            // Corrected path to skills.json (one level up from sections/skills/)
            let response = await fetch("../skills.json");
            const data = await response.json();
            allSkillsCategories = data; // Store the full categorized data
            console.log("skills.js: Skills data fetched successfully.", allSkillsCategories);
            return data;
        } catch (error) {
            console.error("skills.js: Error fetching skills data:", error);
            return {};
        }
    }

    function createCategoryButtons() {
        const filterContainer = document.getElementById("skillCategoryFilters");
        if (!filterContainer) {
            console.error("skills.js: #skillCategoryFilters not found.");
            return;
        }

        let buttonsHTML = `<button class="portfolio-menu active" data-filter="all">All Skills</button>`;

        // Add buttons for each category
        for (const categoryName in allSkillsCategories) {
            if (allSkillsCategories.hasOwnProperty(categoryName)) {
                buttonsHTML += `<button class="portfolio-menu" data-filter="${categoryName}">${categoryName}</button>`;
            }
        }
        filterContainer.innerHTML = buttonsHTML;
        console.log("skills.js: Category buttons created.");

        // Attach click listeners to new buttons
        $(filterContainer).on('click', '.portfolio-menu', function () {
            $(filterContainer).find('.portfolio-menu').removeClass('active');
            $(this).addClass('active');
            const filterValue = $(this).data('filter');
            filterAndDisplaySkills(filterValue);
        });
    }

    function flattenSkills(categories) {
        let allSkills = [];
        for (const categoryName in categories) {
            if (categories.hasOwnProperty(categoryName)) {
                allSkills = allSkills.concat(categories[categoryName]);
            }
        }
        return allSkills;
    }

    function renderSkills(skillsToDisplay) {
        let skillsContainer = document.getElementById("skillsContainer");
        if (!skillsContainer) {
            console.error("skills.js: #skillsContainer not found in skills.html.");
            return;
        }

        let skillHTML = "";
        if (skillsToDisplay && skillsToDisplay.length > 0) {
            skillsToDisplay.forEach(skill => {
                skillHTML += `
                <div class="bar">
                      <div class="info">
                        <img src="${skill.icon}" alt="${skill.name}" />
                        <span>${skill.name}</span>
                      </div>
                    </div>`;
            });
        } else {
            skillHTML = `<p style="text-align: center; font-size: 1.8rem; color: #ccc;">No skills found for this category.</p>`;
        }

        skillsContainer.innerHTML = skillHTML;
        console.log(`skills.js: ${skillsToDisplay.length} skills rendered into DOM.`);

        // Reapply ScrollReveal animations to the new skill bars
        if (typeof srtop !== 'undefined') {
            srtop.reveal('.skills-content .container .bar', { interval: 100, delay: 0 }); // Reset delay for re-reveal
            console.log("skills.js: ScrollReveal animations reapplied to skill bars.");
        } else {
            console.warn("skills.js: ScrollReveal (srtop) is not defined. Animations might not work.");
        }
    }

    function filterAndDisplaySkills(categoryName) {
        let skillsToDisplay = [];
        if (categoryName === 'all') {
            skillsToDisplay = flattenSkills(allSkillsCategories);
        } else if (allSkillsCategories[categoryName]) {
            skillsToDisplay = allSkillsCategories[categoryName];
        }
        renderSkills(skillsToDisplay);
    }

    // Initialize the skills section
    fetchData().then(() => {
        createCategoryButtons();
        // Initially display all skills
        filterAndDisplaySkills('all');
        console.log("skills.js: Initial display of all skills and category buttons complete.");

        // Apply ScrollReveal to heading and container once
        if (typeof srtop !== 'undefined') {
            srtop.reveal('.skills-content .heading', { delay: 100 });
            srtop.reveal('.skills-content .portfolio-filters', { delay: 200 });
            srtop.reveal('.skills-content .container', { delay: 300 });
            console.log("skills.js: Initial ScrollReveal animations applied to heading, filters, and container.");
        }
    }).catch(error => {
        console.error("skills.js: Error during initialization:", error);
    });

    // Re-highlight the active link in this section's navbar, if needed
    // The active class is hardcoded in HTML for now, but if dynamic, this could update it.
});