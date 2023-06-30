const selectLogedUser = (state) => state.user.logedUser;
const selectLogedIn = (state) => state.user.logedIn;
const selectAllUsers = (state) => state.user.allUsers;

export { selectLogedUser, selectLogedIn, selectAllUsers };
