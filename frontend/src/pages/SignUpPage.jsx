import { useState } from 'react';
import Button from '../components/button';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', email); // Output email. Replace with API call? 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <p>Welcome to the sign up page!</p>
      <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='Enter your email'
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Enter your password'
          required
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpPage;
