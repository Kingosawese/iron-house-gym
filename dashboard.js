document.addEventListener("DOMContentLoaded", function () {
    const memberName = sessionStorage.getItem("ironHouseMemberName");
    const memberEmail = sessionStorage.getItem("ironHouseMemberEmail");

    const welcomeMessage = document.getElementById("welcomeMessage");
    const nameElement = document.getElementById("memberName");
    const emailElement = document.getElementById("memberEmail");
    const logoutButton = document.getElementById("logoutButton");

    if (memberName && welcomeMessage) {
        welcomeMessage.textContent = "Welcome Back, " + memberName + "! 💪";
    }

    if (nameElement) {
        nameElement.textContent = memberName || "Demo Member";
    }

    if (emailElement) {
        emailElement.textContent = memberEmail || "No email registered";
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();

            sessionStorage.removeItem("ironHouseMemberName");
            sessionStorage.removeItem("ironHouseMemberEmail");

            window.location.href = "login.html";
        });
    }
});
const dashboardThemeButton = document.getElementById("themeToggle");

function setDashboardTheme(theme) {
    document.body.classList.toggle("light-mode", theme === "light");

    if (dashboardThemeButton) {
        dashboardThemeButton.textContent =
            theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
    }
}

const dashboardSavedTheme =
    localStorage.getItem("ironHouseTheme") || "dark";

setDashboardTheme(dashboardSavedTheme);

if (dashboardThemeButton) {
    dashboardThemeButton.addEventListener("click", function() {
        const currentlyLight =
            document.body.classList.contains("light-mode");

        const newTheme = currentlyLight ? "dark" : "light";

        localStorage.setItem("ironHouseTheme", newTheme);
        setDashboardTheme(newTheme);
    });
}