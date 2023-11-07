import React from 'react';
import { useState } from 'react';
import './App.css';
import Guess from './components/Guess';
//import 'bootstrap/dist/css/bootstrap.css';

export interface Animal{
  name: string;
  class: string;
  weight: string;
  height: string;
  diet: string;
  habitat: string;
  medium: string;
  image: string;
}

function App() {
  const [animal, setAnimal] = useState<Animal>({
    name: 'Elefante',
    class: 'Mamífero',
    weight: '6000kg',
    height: '3,3m',
    diet: 'Herbívoro',
    habitat: 'Sabana',
    medium: 'Terrestre',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/1200px-African_Bush_Elephant.jpg'
  });
  return (
    <div className="App">
      <div className='main-container'>
        <h1> Wildle </h1>
        <h2> Adivina el animal de hoy </h2>
        <form className='animal-form'>
          <input className='guess-input' type='text'></input>
          <button className='guess-button'> Adivinar </button>
        </form>
        <Guess key={animal.name} animal={animal}  />
      </div>
    </div>
  );
}

export default App;