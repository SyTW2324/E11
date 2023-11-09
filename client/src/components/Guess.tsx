import React from "react";
import { useState } from "react";
import Category from "./Category";
import "../styles/Guess.css";
import { Animal } from "./GuessList";

interface GuessProps {
  animal: Animal;
  random: Animal | null;
}

function Guess(props: GuessProps) {
  if (!props.random) {
    return null;
  }
  function compareStrings(
    category1: string | string[],
    category2: string | string[]
  ) {
    const array1 = Array.isArray(category1) ? category1 : [category1];
    const array2 = Array.isArray(category2) ? category2 : [category2];

    if (array2.every(element => array1.includes(element))
    && array1.every(element => array2.includes(element))) {
      return '=';
    }
    if (array1.some(element => array2.includes(element))) {
      return '=/=';
    }
    return '!=';
  }

  function compareNumbers(category1: number, category2: number) {
    if (category2 > category1) {
      return ">";
    } else if (category2 < category1) {
      return "<";
    }
    return "=";
  }

  return (
    <div className="guess-container">
      <div className="guess-image">
        <img src={props.animal.image} alt={props.animal.name} />
      </div>
      <div className="guess-categories">
        <Category
          title="Clase"
          category={props.animal.class}
          isCorrect={
            props.random
              ? compareStrings(props.animal.class, props.random.class)
              : "!="
          }
        />
        <Category
          title="Peso(kg)"
          category={props.animal.weight}
          isCorrect={
            props.random
              ? compareNumbers(props.animal.weight, props.random.weight)
              : "!="
          }
        />
        <Category
          title="Altura(m)"
          category={props.animal.size}
          isCorrect={
            props.random
              ? compareNumbers(props.animal.size, props.random.size)
              : "!="
          }
        />
        <Category
          title="Dieta"
          category={props.animal.diet}
          isCorrect={
            props.random
              ? compareStrings(props.animal.diet, props.random.diet)
              : "!="
          }
        />
        <Category
          title="Hábitat"
          category={props.animal.habitat}
          isCorrect={
            props.random
              ? compareStrings(props.animal.habitat, props.random.habitat)
              : "!="
          }
        />
        <Category
          title="Medio"
          category={props.animal.medium}
          isCorrect={
            props.random
              ? compareStrings(props.animal.medium, props.random.medium)
              : "!="
          }
        />
      </div>
    </div>
  );
}

export default Guess;
