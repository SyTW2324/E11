import React, {useState} from "react";
import {Animal} from "./GuessList";
import "../styles/GuessForm.css";

function GuessForm({
  onAnimalChange,
}: {
  onAnimalChange: (newAnimal: Animal) => void;
}) {
  const [input, setInput] = useState("");

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSend = (event: any) => {
    if (input === "") {
      event.preventDefault();
      alert("Por favor ingresa un animal");
    } else {
      searchAnimal(event);
      setInput("");
    }
  };

  const searchAnimal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newGuess = input;
    try {
      const response = await fetch(`http://localhost:5000/animals/${newGuess}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onAnimalChange(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <form className="animal-form" onSubmit={handleSend}>
        <input
          className="guess-input"
          type="text"
          id="guess"
          value={input}
          onChange={handleChange}
        />
        <button className="guess-button"> Adivinar </button>
      </form>
    </div>
  );
}

export default GuessForm;
