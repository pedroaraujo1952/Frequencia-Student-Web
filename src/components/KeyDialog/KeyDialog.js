import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function ForgotPswdDialog({
  open,
  onClose,
  onChange,
  keywordNumber,
  onSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth={"xs"}
    >
      <DialogContent>
        <DialogContentText style={{ textAlign: "center" }}>
          <strong>
            Insira a {keywordNumber}
            <sup>a</sup> palavra-passe fornecida pelo(a) professor(a).
          </strong>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Palavra-passe"
          name="popup_key_input"
          type="text"
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
