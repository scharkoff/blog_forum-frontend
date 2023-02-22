import React from "react";

// -- Material UI
import { Typography } from "@mui/material";

// -- React-redux
import { useDispatch, useSelector } from "react-redux";

// -- Redux state
import { fetchUsers } from "../../redux/slices/users.js";

// -- Components
import { UsersTable } from "../../components/UsersTable/index.jsx";
import { AlertMessage } from "../../components/AlertMessage/index.jsx";

export const AdminPanelTable = () => {
  const dispatch = useDispatch();

  // -- Уведомления об операциях
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- Auth user
  const user = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchUsers());
    document.title = "Админ панель";
  }, []);

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <Typography variant="h5" gutterBottom style={{ margin: 0 }}>
        Таблица всех пользователей
      </Typography>

      <UsersTable
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
        user={user}
      />
    </div>
  );
};
