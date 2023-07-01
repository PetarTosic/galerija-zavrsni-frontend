import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performUserSet: () => {},
  performLogedIn: () => {},
  performRegister: () => {},
  performAllUsersSet: () => {},
  performAuthorSet: () => {},
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    logedUser: {},
    logedIn: false,
    allUsers: [],
    author: {},
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
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setLogout,
  setAllUsers,
  setLogedUser,
  setAuthor,
  performLogedIn,
  performUserSet,
  performRegister,
  performAllUsersSet,
  performAuthorSet,
} = userSlice.actions;

export default userSlice.reducer;
