/*import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
function App() {
  return(
    //<HomePage/>
    <LoginPage/>
    
  );
}
export default App;*/
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userId, setUserId] = useState(null);

 if (isLoggedIn) {
  return (
    <HomePage
      userId={userId}
      onLogout={() => {
        setUserId(null);
        setIsLoggedIn(false);
      }}
    />
  );
}

  if (showSignUp) {
    return (
      <SignUpPage
        onRegisterSuccess={() => setShowSignUp(false)}
        onBackToLogin={() => setShowSignUp(false)}
      />
    );
  }

  return (
    <LoginPage
    onLoginSuccess={(userId) => {
        setUserId(userId);
        setIsLoggedIn(true);
    }}
    SignUp={() => setShowSignUp(true)}
/>
  );
}

export default App;