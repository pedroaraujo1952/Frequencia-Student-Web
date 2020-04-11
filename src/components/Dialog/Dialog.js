import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ForgotPswdDialog({
  open,
  onClose,
  onChange,
  error,
  onSubmit,
}) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Esqueci minha senha</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Digite o email da sua conta para recuperar a senha
        </DialogContentText>
        <TextField
          autoFocus
          error={error !== "" ? true : false}
          helperText={error}
          margin="dense"
          id="name"
          label="Email"
          name="forgotPswd"
          type="email"
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSubmit} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
