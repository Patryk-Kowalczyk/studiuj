import React from "react";
import { gql } from "@apollo/client";
import { useApollo } from "../../lib/graphql/apolloClient";
import { useDispatch } from "react-redux";
import LoadingButton from "../common/LoadingButton";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setMessage } from "../../lib/store/actions/message";

const SEND_EMAIL = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email }) {
      status
      message
    }
  }
`;

export default function ForgotPasswordDialog({ open, handleClose }) {
  const client = useApollo();
  const [email, setEmail] = React.useState("");
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isResponseLoading, setIsResponseLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsResponseLoading(true);
    const result = await client
      .mutate({
        mutation: SEND_EMAIL,
        variables: { email },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.forgotPassword.status === "EMAIL_SENT") {
          dispatch(setMessage("Pomyślnie wysłano email do zmiany hasła."));
          handleClose();
          setIsResponseLoading(false);
        }
        return true;
      })
      .catch((err) => {
        setIsEmailError(true);
        setIsResponseLoading(false);
        return false;
      });
    return result;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Odzyskiwanie hasła</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wygląda na to, że nie pamiętasz hasła. Aby rozpocząć odzyskiwanie
            hasła podaj swój <b>email</b>, a następnie otrzymasz wiadomość z
            linkiem do odzyskiwania hasła.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            name="email"
            fullWidth
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailError(false);
            }}
            error={isEmailError}
            helperText={
              isEmailError ? "Nie znalezniono konta o podanym emailu." : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <LoadingButton
            color="primary"
            type="submit"
            loading={isResponseLoading}
          >
            Wyślij
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
