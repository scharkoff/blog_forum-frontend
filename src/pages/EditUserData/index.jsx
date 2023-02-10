import React from "react";

// -- Material UI
import { Typography } from "@mui/material";

// -- React-redux
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AlertMessage } from "../../components/AlertMessage/index.jsx";
import { UserLoginForm } from "../../components/EditUserDataForms/UserLoginForm/index.jsx";
import { UserEmailForm } from "../../components/EditUserDataForms/UserEmailForm/index.jsx";
import { UserRankForm } from "../../components/EditUserDataForms/UserRankForm/index.jsx";
import { UserPasswordForm } from "../../components/EditUserDataForms/UserPasswordForm/index.jsx";

export const EditUserData = () => {
  const editbleUserData = useSelector((state) => state.users.editbleUserData);

  const { id } = useParams();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rank, setRank] = React.useState("");

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- useEffect
  React.useEffect(() => {
    if (editbleUserData) {
      setLogin(editbleUserData.login);
      setEmail(editbleUserData.email);
      setRank(editbleUserData.rank);
    }
  }, [editbleUserData]);

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <Typography variant="h5" gutterBottom>
        Изменение данных пользователя
      </Typography>

      <UserLoginForm
        id={id}
        login={login}
        setLogin={setLogin}
        editbleUserData={editbleUserData}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <UserEmailForm
        id={id}
        email={email}
        setEmail={setEmail}
        editbleUserData={editbleUserData}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <UserRankForm
        id={id}
        rank={rank}
        setRank={setRank}
        editbleUserData={editbleUserData}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />

      <UserPasswordForm
        id={id}
        password={password}
        setPassword={setPassword}
        editbleUserData={editbleUserData}
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
      />
    </div>
  );
};
