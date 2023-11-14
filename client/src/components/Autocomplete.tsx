import React from "react"
import "../styles/Autocomplete.css"

interface AutocompleteProps {
  recommendations: string[]
  setInput: (input: string) => void
}

function Autocomplete({ recommendations, setInput }: AutocompleteProps) {
  const handleClick = (recommendation: string) => {
    setInput(recommendation)
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