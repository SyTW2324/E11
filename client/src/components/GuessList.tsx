import React from "react";
import { useState, useEffect } from "react";
import Guess from "./Guess";
import GuessForm from "./GuessForm";
import "../styles/GuessList.css";
import { AnimalInterface } from "../../../server/src/models/animals";

function GuessList(_id: any) {
  const [guessList, setGuessList] = useState<AnimalInterface[]>([]);
  const [randomAnimal, setRandomAnimal] = useState<AnimalInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [tries, setTries] = useState(0);

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
    setTries(tries + 1);
    setGuessList((prevGuessList) => [...prevGuessList, newAnimal]);
    if (newAnimal.name === randomAnimal.name) {
      setFinished(true);
      const addUserPoints = async () => {
        try {
          console.log(_id);
          const response = await fetch(`http://localhost:5000/user/addPoints/${_id._id}`, { method: "POST" });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
      addUserPoints();
    }
  };

  return (
    <>
      <GuessForm onAnimalChange={addGuess} finished={finished} tries={tries} />
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
