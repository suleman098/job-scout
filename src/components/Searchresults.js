import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";

function Searchresults() {
  const { displayjobs, loading, setSelectedJob } = useAppContext();
  const [visibleJobs, setVisibleJobs] = useState(5); // Show 5 jobs initially
  const containerRef = useRef(null); // Ref for the scrollable container

  const loadMoreJobs = () => {
    if (displayjobs.length > visibleJobs) {
      setVisibleJobs(visibleJobs + 5); // Load 5 more jobs
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // Detect when the user scrolls near the bottom of the div
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        loadMoreJobs();
      }
    }
  };

  useEffect(() => {
    const scrollableDiv = containerRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    // Clean up event listener on component unmount
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleJobs, displayjobs]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  if (!displayjobs || displayjobs.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="max-h-[80vh] overflow-y-auto flex flex-col gap-4"
    >
      {displayjobs.slice(0, visibleJobs).map((job, index) => {
        const estimatedSalary =
          job.salary_min && job.salary_max
            ? `$${((job.salary_min + job.salary_max) / 2).toFixed(2)}`
            : "N/A";

        return (
          <div key={index} className="mb-3">
            <div
              onClick={() => handleJobClick(job)}
              className="card bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl p-1 w-[500px] h-[250px] text-black transition-shadow duration-300 rounded-lg"
            >
              <div className="card-body text-left">
                <p className="card-title text-xl font-bold">{job.title}</p>
                <span className="text-sm text-gray-600 font-bold ">
                  {job.company.display_name}
                </span>
                <span className="text-sm text-gray-600 font-bold ">
                  {job.location.display_name}
                </span>
                <div className="flex flex-wrap gap-2 mt-2 text-[10px] mb-2">
                  <span className="bg-gray-100 p-1 text-gray-500 font-bold rounded">
                    {job.contract_time === "full_time"
                      ? `Full-Time`
                      : "Contract Time - N/A"}
                  </span>

                  <span className="bg-gray-100 p-1 text-gray-500 font-bold rounded">
                    {job.contract_type}
                  </span>
                  <span className="bg-gray-100 p-1 text-gray-500 font-bold rounded">
                    {estimatedSalary} a year
                  </span>
                </div>

                <p className="text-sm text-black-500 line-clamp-2 text-wrap">
                  {job.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Searchresults;
