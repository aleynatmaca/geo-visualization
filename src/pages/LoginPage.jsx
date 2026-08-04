import "./LoginPage.css";
import { useState } from "react";
function LoginPage({ onLoginSuccess, onGoToSignUp }) {
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

if (loginSuccess) {
  onLoginSuccess();
} else {
  alert("Incorrect email or password.");
}
}
   return( <div className="login-container">
    <h1> Login </h1><div className="group"> 
    <label> Email </label>
    <input type="email"
    placeholder="Enter your email"
    onChange = { (e)=> setEmail(e.target.value)}
    />  </div>
   <div className="group"> <label> Password </label>
    <input type="password"
    placeholder="Enter your password"
    onChange={(e) => setPassword(e.target.value)}
    /> </div>
    <div className="button-group">
        <button onClick={handleLogin}> Log In </button> 
        <button onClick={onGoToSignUp}>
  Sign Up
</button></div>
        </div>
  );
}
export default LoginPage;