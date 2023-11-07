import React from 'react';
import { useState } from 'react';
import Category from './Category';
import '../styles/Guess.css';
import { Animal } from './GuessList';

function Guess(props: {animal: Animal}) {
  return (
    <div className='guess-container'>
      <div className='guess-image'>
        <img src={props.animal.image} alt={props.animal.name} />
      </div>
      <div className='guess-categories'>
        <Category title='Clase' category={props.animal.class} />
        <Category title='Peso(kg)' category={props.animal.weight} />
        <Category title='Altura(m)' category={props.animal.size} />
        <Category title='Dieta' category={props.animal.diet} />
        <Category title='Hábitat' category={props.animal.habitat} />
        <Category title='Medio' category={props.animal.medium} />
      </div>
    </div>
  )
}

export default Guess;
