import Autosuggest from "react-autosuggest";
import { useState } from "react";
import useFetchJobSuggestions from "@/hooks/useFetchJobSuggestions";
function JobAutosuggest({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);

  const appID = "cb1d900b";
  const APIkey = "2441fe8a4f27996897939ead4f660105";

  const fetchSuggestions = async (value) => {
    try {
      const response = await fetch(
        `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appID}&app_key=${APIkey}&results_per_page=5&what=${encodeURIComponent(
          value
        )}&content-type=application/json`
      );

      if (response.ok) {
        const data = await response.json();
        const titles = data.results.map((job) => job.title);
        return titles.slice(0, 5); // Limit to top 5 suggestions
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    return [];
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 2) {
      const fetchedSuggestions = await fetchSuggestions(value);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
      {suggestion}
    </div>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "Job Title",
        value,
        onChange: (_, { newValue }) => onChange(newValue),
      }}
      theme={{
        container: "relative w-full max-w-xl",
        input: "input input-bordered w-full max-w-xl rounded-lg bg-white",
        suggestionsContainer:
          "absolute z-10 bg-white w-full shadow-lg rounded-lg text-sm max-h-[150px] overflow-y-auto", // Smaller font size and a max height for scrolling
        suggestionsList: "list-none p-0 m-0",
        suggestion: "py-1 px-3 hover:bg-gray-200 cursor-pointer text-[12px]", // Smaller padding and font size for each suggestion
        suggestionHighlighted: "bg-gray-200",
      }}
    />
  );
}

export default JobAutosuggest;
