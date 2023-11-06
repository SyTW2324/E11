import React from 'react';
import '../styles/Category.css';

interface GuessProps {
  title: string;
  category: string;
}

function Category(props: GuessProps) {
  return (
    <div className='category-container'>
      <p> {props.title} </p>
      <hr />
      <p> {props.category} </p>
    </div>
  )
}

export default Category;

