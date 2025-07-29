const API_URL = "http://localhost:8081/api/v1/auth"; // Twój backend

function showRegister() {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
}

async function registerUser() {
  const firstname = document.getElementById("register-firstname").value;
  const lastname = document.getElementById("register-lastname").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!firstname || !lastname || !email || !password) {
    alert("Wypełnij wszystkie pola!");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    if (res.ok) {
      alert("Konto utworzone! Możesz się zalogować.");
      showLogin();
    } else {
      alert("Rejestracja nie powiodła się.");
    }
  } catch (err) {
    console.error(err);
    alert("Błąd połączenia z serwerem.");
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);

      // wołamy Ruby'ego, żeby zamknął okno logowania i odpalił dashboard
      window.location = "skp:open_dashboard@";
    } else {
      alert("Błędny email lub hasło.");
    }
  } catch (err) {
    console.error(err);
    alert("Błąd połączenia z serwerem.");
  }
}
