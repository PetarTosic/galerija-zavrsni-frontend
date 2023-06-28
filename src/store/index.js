import { configureStore } from "@reduxjs/toolkit";
// import chuckReducer from "./chuck/slice";
// import triviaReducer from "./trivia/slice";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import userReducer from "./user/slice";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    // chuck: chuckReducer,
    // trivia: triviaReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}