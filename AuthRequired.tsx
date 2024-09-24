import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthRequired: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateAuth = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      username === process.env.AUTH_USERNAME &&
      password === process.env.AUTH_PASSWORD
    ) {
      history.push('/');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div>
      <h1>Authentication Required</h1>
      <p>
        This page is protected by basic authentication. Please enter your
        username and password to access the content.
      </p>
      <form onSubmit={validateAuth}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthRequired;