import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { Logo } from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/UserSlice";
import { clearStore } from "../features/allJobs/AllJobsSlice";
export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Wrapper style={{ zIndex: 1 }}>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={toggleDropdown}>
            <FaUserCircle /> {user?.name} <FaCaretDown />
          </button>
          <div className={`dropdown ${showDropdown ? "show-dropdown" : null}`}>
            <button
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore());
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
