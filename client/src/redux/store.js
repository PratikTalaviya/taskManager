import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import noteReducer from "./slices/noteSlice";
import taskReducer from "./slices/taskSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    task: taskReducer,
    note: noteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
