import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { Logo } from "./Logo";
import { NavLinks } from "./";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/UserSlice";

export const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? "show-sidebar" : null}`}
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks bigSidebar={false} />
        </div>
      </div>
    </Wrapper>
  );
};
