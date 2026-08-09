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
      alert("Kayıt başarılı");
      onRegisterSuccess();
    } else {
      alert("Kayıtlı e-posta.");
    }
  }

  return (
    <div className="login-container">
      <h2>Kayıt Ol</h2>

      <div className="group">
        <label>E-posta</label>
        <input
          type="email"
          placeholder="E-posta adresinizi giriniz"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="group">
        <label>Şifre</label>
        <input
          type="password"
          placeholder="Şifrenizi giriniz"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={handleRegister}>Kayıt</button>
        <button onClick={onBackToLogin}>Giriş ekranına dön</button>
      </div>
    </div>
  );
}

export default SignUpPage;