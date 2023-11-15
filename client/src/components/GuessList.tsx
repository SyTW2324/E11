import React from "react";
import { useState, useEffect } from "react";
import Guess from "./Guess";
import GuessForm from "./GuessForm";
import "../styles/GuessList.css";
import { AnimalInterface } from "../../../server/src/animals";

function GuessList() {
  const [guessList, setGuessList] = useState<AnimalInterface[]>([]);
  const [randomAnimal, setRandomAnimal] = useState<AnimalInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchRandomAnimal = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/animals/random");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRandomAnimal(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      setIsLoading(false);
    };

    fetchRandomAnimal();
  }, []);

  if (isLoading || !randomAnimal) {
    return <div className="lds-dual-ring"></div>;
  }

  const addGuess = (newAnimal: AnimalInterface) => {
    if (guessList.some((animal) => animal.name === newAnimal.name)) {
      alert("Ya has adivinado este animal");
      return;
    }
    setGuessList((prevGuessList) => [...prevGuessList, newAnimal]);
    if (newAnimal.name === randomAnimal.name) {
      setFinished(true);
    }
  };

  return (
    <>
      <GuessForm onAnimalChange={addGuess} finished={finished} />
      <div className="guess-list">
        {guessList
          .slice(0)
          .reverse()
          .map((guess, index) => (
            <Guess key={index} animal={guess} random={randomAnimal} />
          ))}
      </div>
    </>
  );
}

export default GuessList;
