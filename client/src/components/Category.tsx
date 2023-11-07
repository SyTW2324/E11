import React from 'react';
import '../styles/Category.css';

interface CategoryProps {
  title: string;
  category: string;
}

function Category(props: CategoryProps) {
  return (
    <div className='category-container'>
      <p> {props.title} </p>
      <hr />
      <p> {props.category} </p>
    </div>
  )
}

export default Category;

