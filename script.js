// ========================================
// IRON HOUSE - WEBSITE JAVASCRIPT
// ========================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 850) {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


// 2. SCROLL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".section, .program-card, .membership-card, .gallery-item, .trainer-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


// 3. MEMBERSHIP PLAN SELECTION

const membershipButtons = document.querySelectorAll("[data-plan]");
const planSelect = document.getElementById("plan");

membershipButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (planSelect) {
            planSelect.value = button.dataset.plan;
        }
    });
});


// 4. CONTACT FORM - WHATSAPP

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const plan = document.getElementById("plan").value;
        const message = document.getElementById("message").value.trim();

        // Replace with the gym's real WhatsApp number.
        const gymWhatsApp = "2348012345678";

        const enquiry =
            "IRON HOUSE MEMBERSHIP ENQUIRY\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Membership: " + plan + "\n" +
            "Message: " + (message || "No additional message");

        const whatsappURL =
            "https://wa.me/" + gymWhatsApp +
            "?text=" + encodeURIComponent(enquiry);

        formMessage.textContent = "Opening WhatsApp...";

        window.open(whatsappURL, "_blank");
    });
}


// 5. ANIMATED STATISTICS

const counters = document.querySelectorAll(".counter");

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target)) {
                observer.unobserve(counter);
                return;
            }

            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress = 1 - Math.pow(1 - progress, 3);

                counter.textContent = Math.floor(target * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    }, {
        threshold: 0.1
    });

    counters.forEach(function (counter) {
        counter.textContent = "0";
        counterObserver.observe(counter);
    });
} else {
    counters.forEach(function (counter) {
        counter.textContent = counter.dataset.target || "0";
    });
}
const themeButtons = document.querySelectorAll("#themeToggle");

function applyTheme(theme) {
    document.body.classList.toggle("light-mode", theme === "light");

    themeButtons.forEach(function(button) {
        button.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
    });
}

const savedTheme = localStorage.getItem("ironHouseTheme") || "dark";
applyTheme(savedTheme);

themeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const isLight = document.body.classList.contains("light-mode");
        const newTheme = isLight ? "dark" : "light";

        localStorage.setItem("ironHouseTheme", newTheme);
        applyTheme(newTheme);
    });
});