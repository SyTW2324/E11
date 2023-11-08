import React from "react";
import {useState} from "react";
import Guess from "./Guess";
import GuessForm from "./GuessForm";

export interface Animal {
  name: string;
  class: string;
  weight: string;
  size: string;
  diet: string;
  habitat: string;
  medium: string;
  image: string;
}

function GuessList() {
  const [guessList, setGuessList] = useState<Animal[]>([]);

  const addGuess = (newAnimal: Animal) => {
    setGuessList((prevGuessList) => [...prevGuessList, newAnimal]);
  };

  return (
    <>
      <GuessForm onAnimalChange={addGuess} />
      <div className="guess-list">
        {guessList.map((guess, index) => (
          <Guess key={index} animal={guess} />
        ))}
      </div>
    </>
  );
}

export default GuessList;
