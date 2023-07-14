import React from "react";
import { FormRow } from "./";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  clearFilters,
  getAllJobs,
  showLoading,
  updateFilters,
} from "../features/allJobs/AllJobsSlice";

const SearchContainer = () => {
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    dispatch(updateFilters({ key, value }));
    dispatch(getAllJobs());
    dispatch(showLoading());
  };

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            value={search}
            handleChange={handleChange}
            name="search"
            labelText="search"
          />
          <FormRow
            type="select"
            options={["all", "pending", "interview", "declined"]}
            value={searchStatus}
            handleChange={handleChange}
            name="searchStatus"
            labelText="status "
          />
          <FormRow
            type="select"
            options={["all", "full-time", "part-time"]}
            value={searchType}
            handleChange={handleChange}
            name="searchType"
            labelText="type "
          />
          <FormRow
            type="select"
            options={sortOptions}
            value={sort}
            handleChange={handleChange}
            name="sort"
            labelText="sort by "
          />
          <button
            className="btn btn-block btn-danger"
            type="button"
            onClick={() => {
              dispatch(clearFilters());
              dispatch(getAllJobs());
            }}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
