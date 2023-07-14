import React from "react";

import img from "../assets/images/silent-orchestra.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
export const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="smed" />
        <h3>page does not exist</h3>
        <p>
          It seems you have mistaken it, it won't be I that bites the bit. A
          pain for times is sure ahead, but not for me - for you instead
        </p>
        <Link to="/">go back</Link>
      </div>
    </Wrapper>
  );
};
