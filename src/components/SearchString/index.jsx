import React from "react";

// -- Styles
import styles from "./Search.module.scss";

// -- Material UI
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";

export const SearchString = ({
  searchText,
  setSearchText,
  setPostsArray,
  copyOfPosts,
  setRows,
  copyOfRows,
  type,
}) => {
  // -- Иконка поиска
  const [activeSearchIcon, setActiveSearchIcon] = React.useState(false);

  // -- Найти посты по результату
  const getPostsLikeSearchText = (e) => {
    const words = e.target.value;
    setSearchText(words);
    setPostsArray(
      copyOfPosts.filter((post) =>
        post.title.toLowerCase().includes(words.toLowerCase())
      )
    );
  };

  // -- Найти пользователей по результату
  const getUsersLikeSearchText = (e) => {
    const words = e.target.value;
    setSearchText(words);
    setRows(
      copyOfRows.filter(
        (row) =>
          row.fullName.toLowerCase().includes(words.toLowerCase()) ||
          row.email.toLowerCase().includes(words.toLowerCase()) ||
          row.rank.toLowerCase().includes(words.toLowerCase())
      )
    );
  };
  return (
    <>
      <TextField
        onSelect={() => setActiveSearchIcon(true)}
        onBlur={() => setActiveSearchIcon(false)}
        variant="standard"
        classes={{ root: styles.search }}
        id="search"
        label="Поиск"
        value={searchText}
        onChange={(e) =>
          type === "users"
            ? getUsersLikeSearchText(e)
            : getPostsLikeSearchText(e)
        }
      />
      <Search
        style={{ marginTop: 30 }}
        color={!activeSearchIcon ? "disabled" : "primary"}
      />
    </>
  );
};
