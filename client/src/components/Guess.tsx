import React from 'react';
import { useState } from 'react';
import Category from './Category';
import '../styles/Guess.css';


function Guess() {
  const [categories, setCategories] = useState(
    [
      { title: 'Clase', category: 'Mamífero' },
      { title: 'Peso', category: '6000 kg' },
      { title: 'Altura', category: '3,3 m' },
      { title: 'Dieta', category: 'Herbívoro' },
      { title: 'Hábitat', category: 'Sabana' },
      { title: 'Medio', category: 'Terrestre' }
    ]
  );
  return (
    <div className='guess-container'>
      <div className='guess-image'>
        <img src='https://static.nationalgeographic.es/files/styles/image_3200/public/01-orphan-elephants-nationalgeographic_2188826.jpg?w=1600&h=1067' alt='Elefante' />
      </div>
      <div className='guess-categories'>
        {
          categories.map((category, index) => {
            return (
              <Category key={index} title={category.title} category={category.category} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Guess;
