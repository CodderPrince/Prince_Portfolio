$(document).ready(function () {
    console.log("work-home.js: Work Home section script loaded.");

    // Navbar menu toggle
    $('.section-header #menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.section-header .navbar').toggleClass('nav-toggle');
        console.log("work-home.js: Navbar menu toggled.");
    });

    async function fetchData() {
        try {
            let response = await fetch("../projects.json");
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("work-home.js: Error fetching projects.json", err);
            return [];
        }
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work-home .box-container");
        if (!projectsContainer) {
            console.error("work-home.js: #work-home .box-container not found.");
            return;
        }

        // Filter out Android projects first, then slice first 10
        const filteredProjects = projects.filter(p => p.category !== "android").slice(0, 10);

        let projectHTML = "";
        filteredProjects.forEach(project => {
            projectHTML += `
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
            </div>`;
        });

        projectsContainer.innerHTML = projectHTML;
        console.log("work-home.js: Featured projects rendered into DOM.");

        // VanillaTilt re-initialization
        if (typeof initializeVanillaTilt === 'function') {
            initializeVanillaTilt();
            console.log("work-home.js: VanillaTilt re-initialized.");
        }

        // ScrollReveal animations
        if (typeof srtop !== 'undefined') {
            srtop.reveal('.work-home-content .heading', { delay: 100 });
            srtop.reveal('.work-home-content .box', { interval: 100, delay: 200 });
            srtop.reveal('.work-home-content .viewall', { delay: 400 });
            console.log("work-home.js: ScrollReveal animations applied.");
        }
    }

    fetchData().then(data => showProjects(data));
});
