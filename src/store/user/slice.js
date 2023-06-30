import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performUserSet: () => {},
  performLogedIn: () => {},
  performRegister: () => {},
  performAllUsersSet: () => {},
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    logedUser: {},
    logedIn: false,
    allUsers: [],
  },
  reducers: {
    setLogedUser: (state, action) => {
      state.logedUser = action.payload;
      state.logedIn = true;
    },
    setLogout: (state) => {
      state.logedIn = false;
      state.logedUser = {};
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setLogout,
  setAllUsers,
  setLogedUser,
  performLogedIn,
  performUserSet,
  performRegister,
  performAllUsersSet,
} = userSlice.actions;

export default userSlice.reducer;
