import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addJob, editJob } from "../../features/job/JobSlice";

export const AddJob = () => {
  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.user.user);
  const { isLoading, isEditing } = useSelector((store) => store.job);
  const init = {
    position: "",
    company: "",
    jobLocation: location,
    status: "pending",
    jobType: "full-time",
  };
  const [tempJob, setTempJob] = useState(init);
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setTempJob((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const clear = () => {
    setTempJob(init);
  };

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditing) return dispatch(editJob(tempJob));
          dispatch(addJob(tempJob));
        }}
      >
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={tempJob.position}
            handleChange={handleChange}
            labelText="position"
          />
          <FormRow
            type="text"
            name="company"
            value={tempJob.company}
            handleChange={handleChange}
            labelText="company"
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={tempJob.jobLocation}
            handleChange={handleChange}
            labelText="job location"
          />
          <FormRow
            type="select"
            name="status"
            value={tempJob.status}
            handleChange={handleChange}
            options={["pending", "declined", "interview"]}
            labelText="status"
          />
          <FormRow
            type="select"
            name="jobType"
            value={tempJob.jobType}
            options={["full-time", "part-time"]}
            handleChange={handleChange}
            labelText="job type"
          />
          <div className="btn-container">
            <button type="button" className="btn clear-btn" onClick={clear}>
              revert
            </button>
            <button type="submit" className=" btn " disabled={isLoading}>
              {isLoading ? "posting..." : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
