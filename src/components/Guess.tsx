import React from 'react';
import Category from './Category';

function Guess() {
  return (
    <div className='guess-container'>
      <div className='guess-image'>
        <img src='https://static.nationalgeographic.es/files/styles/image_3200/public/01-orphan-elephants-nationalgeographic_2188826.jpg?w=1600&h=1067' alt='Elefante' />
      </div>
      <div className='guess-categories'>
        <Category title='Clase' category='Mamífero' />
        <Category title='Peso' category='6000 kg' />
        <Category title='Altura' category='3,3 m' />
        <Category title='Hábitat' category='Sabana' />
        <Category title='Medio' category='Terrestre' />
      </div>
    </div>
  )
}

export default Guess;
