// ================================
// EMAIL → PASSWORD
// ================================

function goToPassword() {

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    const error = document.getElementById("email-error");

    // Clear previous error
    error.textContent = "";

    // Check if email is empty
    if (email === "") {

        error.textContent = "Enter an email or phone number.";

        emailInput.focus();

        return;
    }

    // Basic email validation
    if (!isValidEmail(email)) {

        error.textContent = "Enter a valid email address.";

        emailInput.focus();

        return;
    }

    // Put email on password screen
document.getElementById("selected-email").textContent = email;

// Get the first letter of the email
const firstLetter = email.charAt(0).toUpperCase();

// Put the first letter inside the profile circle
document.getElementById("account-initial").textContent = firstLetter;


    // Hide email section
    document.getElementById("email-section").classList.add("hidden");

    // Show password section
    document.getElementById("password-section").classList.remove("hidden");

    // Focus password
    document.getElementById("password").focus();
}


// ================================
// EMAIL VALIDATION
// ================================

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


// ================================
// GO BACK TO EMAIL
// ================================

function goBack() {

    document.getElementById("password-section")
        .classList.add("hidden");

    document.getElementById("email-section")
        .classList.remove("hidden");

    document.getElementById("password").value = "";

    document.getElementById("password-error").textContent = "";

    document.getElementById("email").focus();
}


// ================================
// SHOW / HIDE PASSWORD
// ================================

function togglePassword() {

    const password =
        document.getElementById("password");

    const button =
        document.querySelector(".show-password");

    if (password.type === "password") {

        password.type = "text";

        button.textContent = "Hide";

    } else {

        password.type = "password";

        button.textContent = "Show";
    }
}


// ================================
// CHECKBOX PASSWORD VISIBILITY
// ================================

function togglePasswordCheckbox() {

    const password =
        document.getElementById("password");

    const checkbox =
        document.getElementById("showPasswordCheckbox");

    const button =
        document.querySelector(".show-password");

    if (checkbox.checked) {

        password.type = "text";

        button.textContent = "Hide";

    } else {

        password.type = "password";

        button.textContent = "Show";
    }
}


// ================================
// SIGN IN
// ================================

async function signIn() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("password-error");

    error.textContent = "";

    if (!password) {
        error.textContent = "Enter your password.";
        return;
    }

    try {

        const response = await fetch("/api/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            error.textContent =
                result.error || "Login failed.";
            return;
        }

        alert("Sign in successful!");

        console.log("Logged in user:", result.user);

        document.getElementById("password").value = "";

    } catch (err) {

        console.error(err);

        error.textContent =
            "Unable to connect to the server.";
    }
}



// ================================
// CREATE ACCOUNT
// ================================

async function createAccount() {

    const email = document.getElementById("email").value.trim();

    const error = document.getElementById("email-error");

    error.textContent = "";

    if (email === "") {
        error.textContent = "Enter an email address.";
        return;
    }

    if (!isValidEmail(email)) {
        error.textContent = "Enter a valid email address.";
        return;
    }

    const password = prompt("Create a password for your demo account:");

    if (!password) {
        return;
    }

    try {

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            error.textContent = result.error || "Unable to create account.";
            return;
        }

        alert("Account created successfully!");

        console.log("Created user:", result.user);

    } catch (error) {

        console.error(error);

        error.textContent = "Something went wrong. Please try again.";
    }
}



// ================================
// HELP LINKS
// ================================

function showHelp(event) {
    event.preventDefault();
}

