import "./LoginPage.css";
import { useState } from "react";
function LoginPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  function handleLogin() {
  const loginRequest = {
   email,
   password
};
 console.log(loginRequest);
}
   return( <div className="login-container">
    <h1> LOG IN </h1><div className="group"> 
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
        <button onClick={handleLogin}> Log In </button> </div>
        </div>
  );
}
export default LoginPage;