import React from "react";
import {useState, useEffect} from "react";
import Guess from "./Guess";
import GuessForm from "./GuessForm";

export interface Animal {
  name: string;
  class: string;
  weight: number;
  size: number;
  diet: string;
  habitat: string;
  medium: string;
  image: string;
}

function GuessList() {
  const [guessList, setGuessList] = useState<Animal[]>([]);
  const [randomAnimal, setRandomAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomAnimal = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/animals/random");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRandomAnimal(data[0]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      setIsLoading(false);
    };

    fetchRandomAnimal();
  }, []);

  if (isLoading || !randomAnimal) {
    return <div>Loading...</div>;
  }

  const addGuess = (newAnimal: Animal) => {
    setGuessList((prevGuessList) => [...prevGuessList, newAnimal]);
  };

  return (
    <>
      <GuessForm onAnimalChange={addGuess} />
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
