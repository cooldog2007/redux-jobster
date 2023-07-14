import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getAllJobs } from "../features/allJobs/AllJobsSlice";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);
  const { isLoading, jobs, totalJobs, numOfPages } = useSelector(
    (store) => store.allJobs
  );
  if (isLoading || !jobs)
    return (
      <Wrapper>
        <Loading center={true} />
      </Wrapper>
    );

  if (!isLoading && jobs.length === 0)
    return (
      <Wrapper>
        <h2>no jobs freestyle</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h5>
        {totalJobs} {totalJobs > 1 ? "jobs" : "job"} found
      </h5>
      <div className="jobs">
        {jobs.map((job, i) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
