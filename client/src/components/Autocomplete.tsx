import React from "react"
import "../styles/Autocomplete.css"

interface AutocompleteProps {
  recommendations: string[]
  setInput: (input: string) => void
  hideAutocomplete: () => void
}

function Autocomplete({ recommendations, setInput, hideAutocomplete }: AutocompleteProps) {
  const handleClick = (recommendation: string) => {
    setInput(recommendation)
    hideAutocomplete();
  }

  return (
    <div className="autocomplete-container">
      {recommendations.map((recommendation, index) => (
        <div key={index} className="autocomplete-item" onClick={() => handleClick(recommendation)}>
          {recommendation}
        </div>
      ))}
    </div>
  )
}

export default Autocomplete