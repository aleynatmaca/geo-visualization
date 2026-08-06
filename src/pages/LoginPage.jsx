import "./LoginPage.css";
import { useState } from "react";
function LoginPage({ onLoginSuccess,SignUp }) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  /*function handleLogin() {
  const loginRequest = {
   email,
   password
};
 console.log(loginRequest);
}*/
async function handleLogin() {
  const loginRequest = {
    email,
    password,
  };

  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });
const loginSuccess = await response.json();

if (loginSuccess.success) {
  onLoginSuccess(loginSuccess.userId);
} else {
  alert("Geçersiz e-posta veya şifre");
}
  
  /*const loginSuccess = await response.json();

if (loginSuccess) {
  onLoginSuccess();
} else {
  alert("Incorrect email or password.");
}*/
}
   return( <div className="login-container">
    <h1> Giriş Yap </h1><div className="group"> 
    <label> E-Posta </label>
    <input type="email"
    placeholder="E-posta adresinizi giriniz"
    onChange = { (e)=> setEmail(e.target.value)}
    />  </div>
   <div className="group"> <label> Şifre </label>
    <input type="password"
    placeholder="Şifrenizi giriniz"
    onChange={(e) => setPassword(e.target.value)}
    /> </div>
    <div className="button-group">
        <button onClick={handleLogin}> Giriş Yap </button> 
        <button onClick={SignUp}>
  Kayıt Ol
</button></div>
        </div>
  );
}
export default LoginPage;