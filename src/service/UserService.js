import { API } from "../shared/api";

export const registerUser = (user) => {
  let first_name = user.first_name;
  let last_name = user.last_name;
  let email = user.email;
  let password = user.password;
  let password_confirmation = user.password_confirmation;

  return API.post("/register", {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  });
};

export const logIn = (user) => {
  let email = user.email;
  let password = user.password;
  return API.post("/login", {
    email,
    password,
  });
};

export const logOut = () => {
  return API.post("/logout");
};

export const getUsers = () => {
  return API.get("/users");
};
