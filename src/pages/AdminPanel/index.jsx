import React from "react";

// -- Material UI
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";

// -- React-redux
import { useDispatch, useSelector } from "react-redux";

// -- Redux state
import { fetchUsers } from "../../redux/slices/users.js";

// -- Components
import { UserTable } from "../../components/UserTable/index.jsx";

export const AdminPanel = () => {
  const dispatch = useDispatch();

  // -- Alert settings hooks
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
      <Alert
        style={{ display: !open ? "none" : "flex", marginBottom: 20 }}
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alertText}
      </Alert>
      <Typography variant="h4" gutterBottom style={{ margin: 0 }}>
        Таблица всех пользователей
      </Typography>

      <UserTable
        setAlertText={setAlertText}
        setAlertType={setAlertType}
        setOpen={setOpen}
        user={user}
      />
    </div>
  );
};
