import { useState } from "react";
import "./LoginPage.css";

function SignUpPage({ onRegisterSuccess, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const registerRequest = {
      email,
      password,
    };

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerRequest),
    });

    const registerSuccess = await response.json();

    if (registerSuccess) {
      alert("Login success.");
      onRegisterSuccess();
    } else {
      alert("email kayıtlı.");
    }
  }

  return (
    <div className="login-container">
      <h1>Sign Up</h1>

      <div className="group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={handleRegister}>Register</button>
        <button onClick={onBackToLogin}>Back to Login</button>
      </div>
    </div>
  );
}

export default SignUpPage;