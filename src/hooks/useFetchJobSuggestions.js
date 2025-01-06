import { useState } from "react";

const useFetchJobSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (jobTitle, location = "UK") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/getJobSuggestions?title=${encodeURIComponent(
          jobTitle
        )}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching suggestions: ${response.statusText}`);
      }

      const data = await response.json();
      const titles = data.results.map((job) => job.title);
      setSuggestions(titles.slice(0, 5)); // Limit to top 5 suggestions
    } catch (error) {
      setError(error.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return { suggestions, loading, error, fetchSuggestions };
};

export default useFetchJobSuggestions;
