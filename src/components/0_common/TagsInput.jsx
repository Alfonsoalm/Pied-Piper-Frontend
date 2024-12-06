import React, { useState } from "react";

export const TagsInput = ({ tags, setTags, placeholder, suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Mostrar sugerencias solo si se escriben al menos 4 letras
    if (value.trim().length >= 4) {
      setFilteredSuggestions(
        suggestions.filter(
          (s) =>
            s.toLowerCase().includes(value.toLowerCase()) && !tags.includes(s)
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      // Validar que la etiqueta esté dentro de las sugerencias
      const isSuggestion = suggestions.some(
        (s) => s.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (isSuggestion && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
        setFilteredSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
      setInputValue("");
      setFilteredSuggestions([]);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="tags-input-container">
      <ul className="tags-list">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            {tag}
            <span className="tag-close-icon" onClick={() => removeTag(index)}>
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
