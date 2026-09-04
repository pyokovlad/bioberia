document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    menuToggle?.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    const districtBlocks = [...document.querySelectorAll(".district-block")];
    const filters = [...document.querySelectorAll(".filter")];
    const counter = document.getElementById("mainCounter");

    function updateCounter() {
        const visible = districtBlocks
            .filter(block => !block.classList.contains("hidden"))
            .reduce((total, block) => total + block.querySelectorAll(".timeline-card").length, 0);

        if (counter) {
            const word = visible === 1 ? "должность" : visible < 5 ? "должности" : "должностей";
            counter.textContent = `${visible} ${word}`;
        }
    }

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            districtBlocks.forEach(block => {
                const show = filter === "all" || block.dataset.district === filter;
                block.classList.toggle("hidden", !show);
            });

            updateCounter();
        });
    });

    updateCounter();

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }
});
