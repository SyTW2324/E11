import React from "react";

interface LoginProps {
  username: string;
  password: string;
  setLogin: (login: boolean) => void;
}

function Login({ username, password, setLogin }: LoginProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLogin(true);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="login-form">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="login-form">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}

export default Login;
