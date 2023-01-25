import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layoutSlice";
import roomsReducer from "./roomSlice";
import patientReducer from "./patientSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    patients: patientReducer,
    rooms: roomsReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch