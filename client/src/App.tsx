import React from "react";
import { useState } from "react";
import "./App.css";
import Guess from "./components/Guess";
import GuessList from "./components/GuessList";
//import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <h1> Wildle </h1>
        <h2> Adivina el animal de hoy </h2>
        <GuessList />
      </div>
    </div>
  );
}

export default App;
