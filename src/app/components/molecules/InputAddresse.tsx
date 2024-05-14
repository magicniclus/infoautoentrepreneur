"use client";

import mapboxgl from "mapbox-gl";
import React, { useState } from "react";

interface LocationSuggestion {
  id: string;
  place_name: string;
  place_type: string[];
}

interface InputLocationProps {
  searchType: "country" | "place" | "address";
  placeholder: string;
  onSelection: (selection: {
    place_name: string;
    coordinates: [number, number];
  }) => void;
}

const InputLocation: React.FC<InputLocationProps> = ({
  searchType,
  placeholder,
  onSelection,
}) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue.length > 1) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          inputValue
        )}.json?access_token=${mapboxgl.accessToken}&types=${searchType}`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  interface LocationSuggestion {
    id: string;
    place_name: string;
    place_type: string[];
    geometry: {
      coordinates: [number, number];
    };
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setInput(suggestion.place_name);
    setSuggestions([]);
    onSelection({
      place_name: suggestion.place_name,
      coordinates: suggestion.geometry.coordinates,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border px-3 py-4 rounded-md border-slate-400 mt-2 hover:border-slate-500 focus:border-slate-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white w-full mt-1 max-h-60 overflow-auto border rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputLocation;
