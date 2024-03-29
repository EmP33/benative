import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import uiSlice from "./ui-slice";
import dataSlice from "./data-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
