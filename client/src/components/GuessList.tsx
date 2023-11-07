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
  const [animal, setAnimal] = useState<Animal>();

  const handleAnimalChange = (newAnimal: Animal) => {
    setAnimal(newAnimal);
    addGuess();
  };

  const addGuess = () => {
    if (animal) {
      setGuessList((prevGuessList) => [...prevGuessList, animal]);
      console.log("nuevo animal");
    }
  };

  return (
    <>
      <GuessForm onAnimalChange={handleAnimalChange} />
      <div className="guess-list">
        {guessList.map((guess, index) => (
          <Guess key={index} animal={guess} />
        ))}
      </div>
    </>
  );
}

export default GuessList;
