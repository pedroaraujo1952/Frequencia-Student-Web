import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const orientation = {
  vertical: "top",
  horizontal: "right",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar({ open, onClose, message, type }) {
  const { vertical, horizontal } = orientation;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
    >
      <Alert onClose={onClose} severity={type} open={open}>
        {message}
      </Alert>
    </Snackbar>
  );
}
