import React from 'react';

interface GuessProps {
  title: string;
  category: string;
}

function Category(props: GuessProps) {
  return (
    <div className='category-container'>
      <p> {props.title} </p>
      <p> {props.category} </p>
    </div>
  )
}

export default Category;

