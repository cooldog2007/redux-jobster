import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { editUser } from "../../features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
export const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const init = {
    name: user?.name ? user.name : "",
    lastName: user?.lastName === "lastName" ? "" : user.lastName,
    email: user?.email ? user.email : "",
    location: user?.location ? user.location : "",
    // token: user.token,
  };
  const [tempUser, setTempUser] = useState(init);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setTempUser((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(editUser(tempUser));
        }}
      >
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={tempUser.name}
            handleChange={handleChange}
            labelText="name"
          />
          <FormRow
            type="text"
            name="lastName"
            value={tempUser.lastName}
            handleChange={handleChange}
            labelText="last name"
          />
          <FormRow
            type="text"
            name="email"
            value={tempUser.email}
            handleChange={handleChange}
            labelText="email"
          />
          <FormRow
            type="text"
            name="location"
            value={tempUser.location}
            handleChange={handleChange}
            labelText="location"
          />
          <button type="submit" className=" btn btn-block" disabled={isLoading}>
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
