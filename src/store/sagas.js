// import * as chuckSagas from "./chuck/saga";
import * as userSagas from "./user/saga";

const sagas = {
  ...userSagas,
  // ...chuckSagas,
  // ...triviaSagas,
};

export default sagas;