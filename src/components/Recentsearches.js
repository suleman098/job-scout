"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppContext } from "@/context/AppContext";
import { FaTrashAlt } from "react-icons/fa";
function Recentsearches() {
  const { user } = useAppContext();
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          setRecentSearches(userDoc.data()?.recentSearches || []);
        } catch (error) {
          console.error("Error fetching recent searches:", error);
        }
      }
    };

    fetchRecentSearches();
  }, [user]);

  const handleDeleteSearch = async (index) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1); // Remove the search at the specified index

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          recentSearches: updatedSearches,
        });
        setRecentSearches(updatedSearches); // Update the state
      } catch (error) {
        console.error("Error updating recent searches:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 text-black text-center">
        Recent Searches
      </h2>

      {recentSearches.length > 0 ? (
        <ul className="list-disc pl-6 text-black">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="mb-1 flex justify-between border-2 border-gray-200 p-2 hover:bg-gray-100"
            >
              <span>
                {search.jobTitle} - {search.location}
              </span>
              <button
                className="text-red-500 ml-4 flex items-center"
                onClick={() => handleDeleteSearch(index)}
              >
                <FaTrashAlt className="mr-2" />
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">No recent searches found.</p>
      )}
    </div>
  );
}

export default Recentsearches;
