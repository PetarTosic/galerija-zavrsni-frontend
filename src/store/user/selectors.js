const selectAllUsers = (state) => state.user.allUsers;
const selectLogedUser = (state) => state.user.logedUser;
const selectLogedIn = (state) => state.user.logedIn;

export { selectAllUsers, selectLogedUser, selectLogedIn };