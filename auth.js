const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };

    if (password === confirm_password) {
        document.getElementById("error").innerHTML = "";
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            fetch("https://newspaper-2jgz.onrender.com/accounts/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    document.getElementById("error").innerText = data.error;
                } else if (data.username) {
                    document.getElementById("error").innerText = data.username[0];
                } else if (data.email) {
                    document.getElementById("error").innerText = data.email[0];
                } else {
                    alert("Registration successful!");
                    window.location.href = "login.html";
                }
            })
            .catch((error) => console.error('Error:', error));
        } else {
            document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Password and confirm password do not match.";
    }
};

const getValue = (id) => {
    return document.getElementById(id).value;
}



const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("password");
    console.log(username, password);

    if (username && password) {
        fetch("https://newspaper-2jgz.onrender.com/accounts/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('amar data',data);
            if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html";
            } else {
                document.getElementById("error").innerText = "Invalid username or password.";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("error").innerText = "An error occurred. Please try again.";
        });
    } else {
        document.getElementById("error").innerText = "Please enter both username and password.";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const authLinks = document.getElementById('authLinks');
    const token = localStorage.getItem('token');

    if (token) {
        // User is logged in, show logout button
        authLinks.innerHTML = `
            <a class="nav-link" href="#" id="logoutButton">Logout</a>
        `;
        document.getElementById('logoutButton').addEventListener('click', handleLogout);
    } else {
        // User is not logged in, show login/register links
        authLinks.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Login/Register</a>
            <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                <li><a class="dropdown-item" href="login.html">Login</a></li>
                <li><a class="dropdown-item" href="register.html">Register</a></li>
            </ul>
        `;
    }
});

const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.href = 'index.html';
};
