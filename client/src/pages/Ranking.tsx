import React from 'react';
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";

function Ranking() {
  return (
    <div>
      <Header />
      <h2>Ranking</h2>
    </div>
  );
}

export default Ranking;