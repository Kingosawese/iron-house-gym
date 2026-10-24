// IRON HOUSE DEMO LOGIN AND REGISTRATION
// Learning project only. Not secure production authentication.

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// REGISTRATION
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const message = document.getElementById("registerMessage");

        if (password.length < 8) {
            message.textContent = "Password must have at least 8 characters.";
            return;
        }

        sessionStorage.setItem("ironHouseMemberName", name);
        sessionStorage.setItem("ironHouseMemberEmail", email);

        message.textContent = "Registration successful! Opening dashboard...";

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);
    });
}

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");
        const message = document.getElementById("loginMessage");

        if (!emailInput.value.trim() || !passwordInput.value) {
            message.textContent = "Please enter your email and password.";
            return;
        }

        const savedEmail = sessionStorage.getItem("ironHouseMemberEmail");
        const email = emailInput.value.trim().toLowerCase();

        if (savedEmail && email !== savedEmail) {
            message.textContent = "Email does not match the demo profile.";
            return;
        }

        if (!savedEmail) {
            sessionStorage.setItem("ironHouseMemberEmail", email);
            sessionStorage.setItem("ironHouseMemberName", "Demo Member");
        }

        message.textContent = "Opening dashboard...";

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 700);
    });
}