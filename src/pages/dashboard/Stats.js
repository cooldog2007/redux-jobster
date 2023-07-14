import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../features/allJobs/AllJobsSlice";
import { Loading } from "../../components";
import { StatsContainer, ChartsContainer } from "../../components";
export const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobs
  );
  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (isLoading || !monthlyApplications) return <Loading center={true} />;

  return (
    <>
      <StatsContainer />
      {monthlyApplications && monthlyApplications.length > 0 && (
        <ChartsContainer />
      )}
    </>
  );
};
