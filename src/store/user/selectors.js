const selectLogedUser = (state) => state.user.logedUser;
const selectLogedIn = (state) => state.user.logedIn;
const selectAllUsers = (state) => state.user.allUsers;
const selectAuthor = (state) => state.user.author;

export { selectLogedUser, selectLogedIn, selectAllUsers, selectAuthor };
