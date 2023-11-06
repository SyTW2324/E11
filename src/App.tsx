import React from 'react';
import './App.css';
import Guess from './components/Guess';
//import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <h1> Wildle </h1>
        <h2> Adivina el animal de hoy </h2>
        <Guess />
      </div>
    </div>
  );
}

export default App;