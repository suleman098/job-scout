"use client";
import { useState, useEffect } from "react";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { useAppContext } from "@/context/AppContext";
import Button from "./Button";
import { db } from "@/firebase"; // Firebase instance
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import JobAutosuggest from "./Jobautosuggest";
function Searchbar() {
  const { setdisplayjobs, user } = useAppContext(); // Ensure user is available in the context
  const [searchData, setSearchData] = useState({
    jobTitle: "nurse",
    location: "UK",
  });
  const [url, setUrl] = useState(null);
  const { jobs, error } = useFetchJobs(url);

  const handleSearch = async () => {
    if (searchData.jobTitle && searchData.location) {
      const searchUrl = `/api/getjobs?title=${encodeURIComponent(
        searchData.jobTitle
      )}&location=${encodeURIComponent(searchData.location)}`;
      setUrl(searchUrl);

      // Update recent searches in Firebase
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Adjust collection path if needed
          const newSearch = {
            jobTitle: searchData.jobTitle,
            location: searchData.location,
            timestamp: new Date().toISOString(), // Optional: Track time
          };

          const userDoc = await getDoc(userDocRef);
          const currentSearches = userDoc.data()?.recentSearches || [];

          const updatedSearches = [newSearch, ...currentSearches]
            .filter(
              (search, index, self) =>
                index ===
                self.findIndex(
                  (s) =>
                    s.jobTitle === search.jobTitle &&
                    s.location === search.location
                )
            )
            .slice(0, 10);

          await updateDoc(userDocRef, { recentSearches: updatedSearches });
        } catch (error) {
          console.error("Error updating recent searches:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      setdisplayjobs(jobs);
    }
  }, [jobs, setdisplayjobs]);

  return (
    <div className="flex justify-center w-full text-black">
      <div className="card w-1/2 bg-white border-gray-200">
        <div className="card-body items-center w-full">
          <div className="flex gap-4 justify-center w-full">
            <JobAutosuggest
              value={searchData.jobTitle}
              onChange={(newValue) =>
                setSearchData((prev) => ({ ...prev, jobTitle: newValue }))
              }
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={searchData.location}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="input input-bordered w-full max-w-xl rounded-lg bg-white"
            />
            <Button onClick={handleSearch}>Search Jobs</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
