import React from "react";
import { styled } from "styled-components";
import image from "../assets/images/jobber-back.png";
const Background = () => {
  return (
    <Wrapper>
      <img src={image} alt="s" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: -1;
  img.resize {
    width: 1920px;
    height: auto;
  }
`;

export default Background;
