import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performUserSet: () => {},
  performLogedIn: () => {},
  performRegister: () => {}
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    logedUser: {},
    logedIn: false
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
    ...middlewareActions,
  }
})

export const { setLogout, setLogedUser, performLogedIn, performUserSet, performRegister } = userSlice.actions;

export default userSlice.reducer;