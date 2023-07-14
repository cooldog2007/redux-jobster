import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Background } from "../components";
export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) return <Navigate to="/landing" />;
  return (
    <>
      <Background />
      {children}
    </>
  );
};
