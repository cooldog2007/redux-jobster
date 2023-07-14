import React from "react";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";

const StatsContainer = () => {
  const { pending, interview, declined } = useSelector(
    (state) => state.allJobs.defaultStats
  );
  const defaultStats = [
    {
      title: "pending applications",
      count: pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, i) => (
        <StatItem key={i} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
