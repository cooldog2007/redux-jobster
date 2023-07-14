export const getLocalUser = () => {
  const res = localStorage.getItem("user");
  const user = res ? JSON.parse(res) : null;
  return user;
};

export const setLocalUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
