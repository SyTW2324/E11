import React from "react";
import { useState, useEffect } from "react";
import Category from "./Category";
import "../styles/Guess.css";
import { AnimalInterface } from "../../../server/src/models/animals";

interface GuessProps {
  animal: AnimalInterface;
  random: AnimalInterface | null;
}

function Guess(props: GuessProps) {

  function compareStringArrays(category1: string[], category2: string[]) {
    if (
      category2.every((element) => category1.includes(element)) &&
      category1.every((element) => category2.includes(element))
    ) {
      return "=";
    }
    if (category1.some((element) => category2.includes(element))) {
      return "=/=";
    }
    return "!=";
  }

  function compareNumbers(category1: number, category2: number) {
    if (category2 > category1) {
      return ">";
    } else if (category2 < category1) {
      return "<";
    }
    return "=";
  }
  function compareStrings(category1: string, category2: string) {
    if (category1 === category2) {
      return "=";
    }
    return "!=";
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
          category={props.animal.height}
          isCorrect={
            props.random
              ? compareNumbers(props.animal.height, props.random.height)
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
              ? compareStringArrays(props.animal.habitat, props.random.habitat)
              : "!="
          }
        />
        <Category
          title="Medio"
          category={props.animal.medium}
          isCorrect={
            props.random
              ? compareStringArrays(props.animal.medium, props.random.medium)
              : "!="
          }
        />
      </div>
    </div>
  );
}

export default Guess;
