import React from "react";

interface RegisterProps {
  username: string;
  email: string;
  password: string;
  setRegister: (register: boolean) => void;
}

function Register({ username, email, password, setRegister }: RegisterProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegister(true);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="register-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="register-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="register-form">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => console.log(event.target.value)}
          />
        </div>
        <div className="register-form">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Register;
