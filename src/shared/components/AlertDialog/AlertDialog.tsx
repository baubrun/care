import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { cancelAlert, continueAlert } from "../../../redux/layoutSlice";
import { AlertDialogProps } from "../../interfaces/alertDialog";

const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const dispatch = useDispatch();
  const { message, title, onOpen } = props;

  const handleCancel = () => {
    dispatch(cancelAlert());
  };

  const handleContinue = () => {
    dispatch(continueAlert());
  };

  return (
    <div>
      <Dialog open={onOpen}>
        <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="textPrimary">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="secondary">
            CANCEL
          </Button>
          <Button onClick={() => handleContinue()} color="primary" autoFocus>
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
