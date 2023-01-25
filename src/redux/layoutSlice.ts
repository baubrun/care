import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { STATUS_INFO } from "../shared/constants/status";
import { AlertDialogProps } from "../shared/interfaces/alertDialog";
import { ToasterProps } from "../shared/interfaces/toaster";
import { RootState } from "./store";

interface LayoutSliceInitialState {
  toasterVisible: boolean,
  toasterMessage: string,
  toasterStatus: string,
  isLoading: boolean,
  alertContinue: boolean,
  alertData: unknown,
  isAlertOpen: boolean,
  alertMessage?: string,
  alertTitle?: string,
}
const initialState: LayoutSliceInitialState = {
  toasterVisible: false,
  toasterMessage: '',
  toasterStatus: STATUS_INFO,
  isLoading: false,
  alertContinue: false,
  alertData: null,
  isAlertOpen: false,
  alertMessage: '',
  alertTitle: '',
}

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    cancelAlert: (state) => {
      state.isAlertOpen = false;
      state.alertContinue = false;
      state.alertData = undefined;
    },
    continueAlert: (state) => {
      state.alertContinue = true;
      state.isAlertOpen = false;
    },
    showAlert: (state, action: PayloadAction<AlertDialogProps>) => {
      state.isAlertOpen = true;
      state.alertData = action.payload?.alertData;
      state.alertMessage = action.payload?.message;
      state.alertTitle = action.payload?.title;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideToaster: (state) => {
      state.toasterVisible = false;
    },
    showToaster: (state, action: PayloadAction<ToasterProps>) => {
      state.toasterVisible = true;
      state.toasterMessage = action.payload?.message;
      state.toasterStatus = action.payload?.status;
    },
  },
});

export const {
  cancelAlert,
  continueAlert,
  showAlert,
  hideLoader,
  showLoader,
  hideToaster,
  showToaster,
} = layoutSlice.actions;

export const layoutState = (state: RootState) => state.layout;

export default layoutSlice.reducer;
