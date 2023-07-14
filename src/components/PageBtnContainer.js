import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, updatePage } from "../features/allJobs/AllJobsSlice";
const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const createTempArray = () => {
    const temp = Array.from({ length: numOfPages }, (_, i) => i + 1);
    return temp;
  };
  return (
    <Wrapper>
      <button
        className="prev-btn"
        disabled={page === 1}
        onClick={() => {
          dispatch(updatePage(page - 1));
          dispatch(getAllJobs());
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {createTempArray().map((x) => {
          return (
            <button
              key={x}
              className={`pageBtn ${page === x ? "active" : "null"}`}
              onClick={() => {
                dispatch(updatePage(x));
                dispatch(getAllJobs());
              }}
            >
              {x}
            </button>
          );
        })}
      </div>
      <button
        className="next-btn"
        disabled={page === numOfPages}
        onClick={() => {
          dispatch(updatePage(page + 1));
          dispatch(getAllJobs());
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
