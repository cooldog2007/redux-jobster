import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/UserSlice";

import { links } from "../utils/links";
import { disableEditing } from "../features/job/JobSlice";
export const NavLinks = ({ bigSidebar }) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link, i) => {
        const { icon, name, url } = link;
        return (
          <NavLink
            to={url}
            key={i}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={() => {
              if (!bigSidebar) dispatch(toggleSidebar());
              if (url === "/add-job") dispatch(disableEditing());
            }}
          >
            {icon}
            {name}
          </NavLink>
        );
      })}
    </div>
  );
};
