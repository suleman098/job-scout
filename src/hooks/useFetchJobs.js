import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
export const useFetchJobs = (url) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const { setLoading } = useAppContext();
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJobs(data.results);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [url]);

  return { jobs, error };
};
