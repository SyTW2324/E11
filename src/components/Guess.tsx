import React from 'react';
import Category from './Category';
import '../styles/Guess.css';

function Guess() {
  return (
    <div className='guess-container'>
      <div className='guess-image'>
        <img src='https://static.nationalgeographic.es/files/styles/image_3200/public/01-orphan-elephants-nationalgeographic_2188826.jpg?w=1600&h=1067' alt='Elefante' />
      </div>
      <div className='guess-categories'>
        <Category title='Hola' category='Si' />
        <Category title='Hola' category='Si' />
        <Category title='Hola' category='Si' />
        <Category title='Hola' category='Si' />
        <Category title='Hola' category='Si' />
      </div>
    </div>
  )
}

export default Guess;
