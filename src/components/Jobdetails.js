import { useAppContext } from "@/context/AppContext";
import Button from "./Button";

function Jobdetails() {
  const { selectedJob } = useAppContext();

  if (!selectedJob) {
    return (
      <div className="p-4 text-gray-500">Select a job to view its details.</div>
    );
  }

  const handleApplyClick = () => {
    if (selectedJob.redirect_url) {
      window.open(selectedJob.redirect_url, "_blank"); // Redirect to the company's website
    } else {
      console.log("No URL provided for this job");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg border-2 p-4">
      {/* Job Summary Section */}
      <div className="mb-4 p-4 shadow-lg rounded-lg bg-white border-2">
        <h1 className="text-2xl font-bold text-black mb-2">
          {selectedJob.title}
        </h1>
        <p className="text-gray-700 text-lg mb-1 font-bold">
          {selectedJob.company.display_name}
        </p>
        <p className="text-gray-600 mb-1 font-bold">
          {selectedJob.category.label}
        </p>
        <div className="text-gray-600 mb-2 font-bold">
          <p>
            {selectedJob.contract_time === "part_time"
              ? "Part Time"
              : selectedJob.contract_time === "full_time"
              ? "Full Time"
              : null}
          </p>
          <p>{selectedJob.contract_type}</p>
        </div>
        <Button onClick={handleApplyClick} className="btn btn-primary mt-2">
          Apply Now
        </Button>
      </div>

      {/* Job Description Section */}
      <div>
        <h2 className="text-xl font-bold text-black mb-2">Job Description</h2>
        <p className="text-gray-700">{selectedJob.description}</p>
      </div>
    </div>
  );
}

export default Jobdetails;
