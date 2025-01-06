"use client";

import Searchbar from "@/components/Searchbar";
import Searchresults from "@/components/Searchresults";
import Jobdetails from "@/components/Jobdetails";
import Loader from "@/components/Loader";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Recentsearches from "@/components/Recentsearches";

function Home() {
  const { loading, user } = useAppContext();
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  return (
    <div className="bg-white h-screen flex flex-col">
      <Searchbar />

      <div className="divider w-full max-w-screen-lg mx-auto divider-secondary h-[2px]"></div>

      <div className="flex justify-between max-w-screen-lg mx-auto px-4 mb-4 gap-x-4">
        <button
          className={` ${
            !showRecentSearches
              ? "font-bold text-xl underline underline-offset-4 decoration-pink-400  text-black"
              : "font-normal text-base text-black"
          }`}
          onClick={() => setShowRecentSearches(false)}
        >
          Search Results
        </button>
        {user && (
          <button
            className={`${
              showRecentSearches
                ? "font-bold text-xl underline underline-offset-4 decoration-pink-400 text-black"
                : "font-normal text-base text-black"
            }`}
            onClick={() => setShowRecentSearches(true)}
          >
            Recent Searches
          </button>
        )}
      </div>

      <div className="flex grow justify-center gap-6 ">
        <div className="max-h-[80vh] overflow-y-auto bg-white w-[500px] shadow-sm">
          {loading && !showRecentSearches ? (
            <Loader />
          ) : showRecentSearches ? (
            <Recentsearches />
          ) : (
            <Searchresults />
          )}
        </div>

        {!showRecentSearches && (
          <div className="w-1/3 max-h-[80vh] overflow-y-auto flex justify-center">
            <Jobdetails />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
