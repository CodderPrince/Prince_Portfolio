$(document).ready(function () {
    console.log("projects.js: Projects section script loaded.");

    // Navbar menu toggle
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("projects.js: Navbar menu toggled.");
    });

    // Fetch projects data from JSON
    async function getProjectsData() {
        return fetch("../projects.json")
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error("projects.js: Error fetching projects.json", err));
    }

    // Display projects dynamically
    function showAllProjects(projects) {
        let projectsContainer = document.querySelector(".projects-content .box-container");
        let projectsHTML = "";

        projects.forEach(project => {
            projectsHTML += `
            <div class="grid-item ${project.category}">
                <div class="box tilt">
                    <img draggable="false" src="${project.image}" alt="${project.name}" />
                    <div class="content">
                        <div class="tag">
                            <h3>${project.name}</h3>
                        </div>
                        <div class="desc">
                            <p>${project.desc}</p>
                            <div class="btns">
                                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        });

        projectsContainer.innerHTML = projectsHTML;

        // Initialize Isotope
        var $grid = $('.projects-content .box-container').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });
        console.log("projects.js: Isotope initialized.");

        // Filter buttons
        $('#filters').on('click', 'button', function () {
            $('#filters').find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            console.log(`projects.js: Isotope filter applied: ${filterValue}`);
        });

        // VanillaTilt (if defined)
        if (typeof initializeVanillaTilt === 'function') {
            initializeVanillaTilt();
            console.log("projects.js: VanillaTilt re-initialized.");
        }

        // ScrollReveal (if defined)
        if (typeof srtop !== 'undefined') {
            srtop.reveal('.projects-content .heading', { delay: 100 });
            srtop.reveal('.projects-content #filters .btn', { interval: 50, delay: 200 });
            srtop.reveal('.projects-content .box', { interval: 100, delay: 400 });
            srtop.reveal('.projects-content .backbtn', { delay: 600 });
            console.log("projects.js: ScrollReveal applied.");
        }
    }

    // Load projects
    getProjectsData().then(data => showAllProjects(data));
});
