import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import JobInfo from "./JobInfo";
import { useDispatch } from "react-redux";
import { deleteJob, enableEditing } from "../features/job/JobSlice";
const Job = ({
  company,
  position,
  jobType,
  jobLocation,
  status,
  updatedAt,
  _id,
}) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.slice(0, 2)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={new Date(updatedAt).toLocaleString(navigator.language, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            // text={fomatDate(updatedAt)}
          />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                console.log(_id);
                dispatch(enableEditing(_id));
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                console.log(_id);
                dispatch(deleteJob(_id));
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
