import React from "react";
import main from "../assets/images/yakub.svg";
import Wrapper from "../assets/wrappers/testing";
import { Logo } from "../components";
import { Link } from "react-router-dom";
export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            minus iusto amet, facere ipsa ab voluptates fugit laboriosam et
            corporis recusandae vitae deserunt nemo molestiae earum sunt
            exercitationem nulla deleniti! Veniam, quaerat corrupti odio
            distinctio beatae facilis sunt modi esse molestiae! Rem mollitia
            suscipit officiis officia consequatur quod ab ipsam, laudantium
            ipsum vitae est quibusdam voluptatibus incidunt qui porro sed?
          </p>
          <Link to="/register" className="btn btn-hero">
            login/register
          </Link>
        </div>
        <img src={main} alt="smee" className="img main-img" />
      </div>
    </Wrapper>
  );
};
