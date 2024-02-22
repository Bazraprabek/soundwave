import { configureStore } from "@reduxjs/toolkit";
import player from "./reducer/playerReducer";
import currentSong from "./reducer/currentSong";
import playing from "./reducer/playing";
import userData from "./reducer/userData";

const store = configureStore(
  {
    reducer: { player, currentSong, playing, userData },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
