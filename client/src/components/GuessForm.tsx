import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import { AnimalInterface } from "../../../server/src/animals";
import "../styles/GuessForm.css";

function GuessForm({
  onAnimalChange,
}: {
  onAnimalChange: (newAnimal: AnimalInterface) => void;
}) {
  const [input, setInput] = useState("");
  const [recomendations, setRecomendations] = useState<string[]>([])


  const searchRecomendations = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await fetch(`http://localhost:5000/animals/name_like/${input}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setRecomendations(data.map((animal: AnimalInterface) => animal.name))
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }


  const handleChange = (event: any) => {
    setInput(event.target.value);
    searchRecomendations(event.target.value)
  };

  const searchAnimal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input === "") {
      alert("Por favor ingresa un animal");
      return;
    }
    const newGuess = input;
    try {
      const response = await fetch(`http://localhost:5000/animals/name/${newGuess}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onAnimalChange(data);
      console.log(data);
      setInput("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const hideAutocomplete = () => {
    setRecomendations([])
  }

  return (
    <div>
      <form className="animal-form" onSubmit={searchAnimal}>
        <input
          className="guess-input"
          type="text"
          id="guess"
          value={input}
          onChange={handleChange}
          autoComplete="off"
        />
        <button className="guess-button"> Adivinar </button>
        {input.length > 2 && <Autocomplete recommendations={recomendations} setInput={setInput} hideAutocomplete={hideAutocomplete} />}
      </form>
    </div>
  );
}

export default GuessForm;
