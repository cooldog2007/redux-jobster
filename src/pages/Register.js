import React from "react";
import { useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChange,
  loginUser,
  registerUser,
  toggleMember,
} from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { name, email, password, isMember, isLoading, user } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoading) return;
          if (!email || !password || (!isMember && !name)) {
            return toast.error("please fill out all fields");
          }

          if (isMember) return dispatch(loginUser({ name, email, password }));
          dispatch(registerUser({ name, email, password }));
        }}
        className="form"
      >
        <Logo />
        <h3>{isMember ? "login" : "register"}</h3>
        {isMember || (
          <FormRow
            type={"text"}
            name={"name"}
            value={name}
            handleChange={(e) =>
              dispatch(handleChange({ key: "name", value: e.target.value }))
            }
            labelText={"name"}
          />
        )}
        <FormRow
          type={"email"}
          name={"email"}
          value={email}
          handleChange={(e) =>
            dispatch(handleChange({ key: "email", value: e.target.value }))
          }
          labelText={"Email"}
        />
        <FormRow
          type={"password"}
          name={"password"}
          value={password}
          handleChange={(e) =>
            dispatch(handleChange({ key: "password", value: e.target.value }))
          }
          labelText={"password"}
        />
        <button type="submit" className="btn btn-block">
          {isLoading ? "loading . . ." : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          onClick={() => {
            dispatch(
              loginUser({
                email: "testUser@test.com",
                password: "secret",
              })
            );
          }}
        >
          Demo user
        </button>
        <p>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            onClick={() => dispatch(toggleMember())}
            className=" member-btn"
            disabled={isLoading}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
