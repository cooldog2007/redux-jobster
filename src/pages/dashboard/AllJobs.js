import React from "react";
import SearchContainer from "../../components/SearchContainer";
import JobsContainer from "../../components/JobsContainer";

export const AllJobs = () => {
  return (
    <div style={{ opacity: 0.9 }}>
      <SearchContainer />
      <JobsContainer />
    </div>
  );
};
