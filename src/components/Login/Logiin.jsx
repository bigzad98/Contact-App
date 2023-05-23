import { useState } from 'react';
import React from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:9000/user');
    const data = await response.json();
    console.log(data)
    // const user = data.find(
    //   (user) => user.id === username && user.password === password
    // );
    const username=data.id;
    const password=data.password
    console.log(username)

    // if (user) {
    //   alert('Login successful!');
    // } else {
    //   alert('Invalid username or password.');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
         type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
export default Login