import React from "react";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { hideToaster } from "../../../redux/layoutSlice";
import { ToasterProps } from "../../interfaces/toaster";

const Toaster: React.FC<ToasterProps> = (props) => {
  const { message, show, status } = props;
  const dispatch = useDispatch();

  const close = () => {
    dispatch(hideToaster());
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={5000}
      open={show}
      onClose={close}
      message={message}
    >
      {status && (
        <MuiAlert
          sx={{ width: "100%" }}
          elevation={4}
          variant="filled"
          severity={status}
        >
          {message}
        </MuiAlert>
      )}
    </Snackbar>
  );
};

export default Toaster;
