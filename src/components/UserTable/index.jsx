import React from "react";

// -- Material UI
import Button from "@mui/material/Button";
// -- Table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// -- Components
import { SearchString } from "../SearchString/index.jsx";

// -- React-redux
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// -- Redux state
import {
  fetchDeleteUser,
  fetchEditUserData,
} from "../../redux/slices/users.js";

export const UserTable = ({ setAlertText, setAlertType, setOpen, user }) => {
  // -- useDispatch
  const dispatch = useDispatch();

  // -- Текст в поисковой строке
  const [searchText, setSearchText] = React.useState("");

  // -- All users from state
  const users = useSelector((state) => state?.users?.data);

  // -- Пользователи из базы данных
  const [rows, setRows] = React.useState(users);
  const [copyOfRows, setCopyOfRows] = React.useState([]);

  React.useEffect(() => {
    if (users) {
      setRows(
        users.map((user) => {
          return {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            rank: user.rank,
            created: user.createdAt.slice(0, 10),
          };
        })
      );

      setCopyOfRows(
        users.map((user) => {
          return {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            rank: user.rank,
            created: user.createdAt.slice(0, 10),
          };
        })
      );
    }
  }, [users]);

  const columns = [
    { id: "id", label: "Id", minWidth: 20 },
    { id: "fullName", label: "Логин", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "created", label: "Дата создания", minWidth: 100 },
    { id: "rank", label: "Права", minWidth: 100 },
    { id: "buttons", label: "Управление", minWidth: 100 },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // -- Получить данные редактируемого пользователя
  const editUser = (id, login, email, rank) => {
    dispatch(fetchEditUserData({ id, login, email, rank }));
  };

  // -- Обработка клика по кнопке "Удалить"
  const deleteUser = async (id) => {
    if (
      window.confirm(
        "Вы действительно хотите удалить данного пользователя? Все его посты и комментарии будут также удалены навсегда!"
      )
    ) {
      const data = await dispatch(fetchDeleteUser(id));

      if (data.payload.isError) {
        setAlertText(
          data.payload.message ? data.payload.message : data.payload[0].msg
        );
        setOpen(true);
        setAlertType("error");
      } else {
        setAlertText("Пользователь успешно удален");
        setOpen(true);
        setAlertType("success");
      }
    }
  };
  return (
    <>
      <SearchString
        searchText={searchText}
        setSearchText={setSearchText}
        setRows={setRows}
        copyOfRows={copyOfRows}
        type={"users"}
      />
      <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rows ? rows : [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column, i) => {
                        const value = row[column.id];
                        return row.id !== user?._id ? (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}

                            {i === 5 ? (
                              <div key={column.id}>
                                <Link
                                  key={column.id}
                                  to={`/admin-panel/edit-user/${row.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <Button
                                    onClick={() =>
                                      editUser(
                                        row.id,
                                        row.fullName,
                                        row.email,
                                        row.rank
                                      )
                                    }
                                    color="primary"
                                  >
                                    Изменить
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => deleteUser(row.id)}
                                  color="error"
                                >
                                  Удалить
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ) : (
                          ""
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Кол-во видимых строк:"}
          labelDisplayedRows={(from = page) =>
            `${from.from}-${from.to === -1 ? from.count : from.to} из ${
              from.count
            }`
          }
        />
      </Paper>
    </>
  );
};
