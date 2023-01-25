import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPatientsService } from "../services";
import { PatientProp } from "../shared/interfaces/patient";
import { RootState } from "./store";

interface PatientInitialState {
  waitingList: PatientProp[];
  patients: PatientProp[];
}

const initialState: PatientInitialState = {
  waitingList: [],
  patients: [],
};


export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    getWaitingList: (state) => {
      state.patients = getPatientsService();
      state.waitingList = getPatientsService().filter(
        (occupant: PatientProp) => occupant?.occupant_id == null
      );
    },
    updateWaitingList: (state, action: PayloadAction<string>) => {
      state.waitingList = state.waitingList.filter(patient => patient?._id !== action?.payload)
    },
    redoWaitingList: (state, action: PayloadAction<string | undefined>) => {
      const patient = state.patients.find(patient => patient._id === action.payload);
      if(patient){
        state.waitingList = [...state.waitingList, patient]
      } 
    }
  },

});

export const { getWaitingList,updateWaitingList, redoWaitingList } = patientSlice.actions;
export const patientState = (state: RootState) => state.patients;
export default patientSlice.reducer;
