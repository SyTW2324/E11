import Header from "../components/Header";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


function User() {
  const { user } = useAuth0();

  return (
    <div>
      <Header />
      <h1>User</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.sub}</p>
    </div>
  );
}

export default User;

