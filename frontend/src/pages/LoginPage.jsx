import { useState } from "react";
import Button from "../components/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Trying to login using:", { email, password }); // Output. Replace with API call?
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Login</h1>
        <p>Welcome to the login page!</p>
      </header>

      <main className="login-main">
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
          <Button type="submit">Login</Button> 
        </form>
        <p>Don't have an account? <a ref="/signup">Sign up here</a>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
