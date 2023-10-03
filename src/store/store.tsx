import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import characterSlice from "./characterSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    characters: characterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
