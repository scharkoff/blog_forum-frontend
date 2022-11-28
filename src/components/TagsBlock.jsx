import React from "react";

// -- Material UI imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

// -- React-redux
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// -- Components
import { SideBlock } from "./SideBlock";

// -- Redux state
import { fetchActiveTag, fetchPostsLikeTag } from "../redux/slices/posts";

export const TagsBlock = ({ items, isLoading = true, setSearchText }) => {
  const dispatch = useDispatch();
  const { activeTag } = useSelector((state) => state.posts.tags);
  const [activeTagName, setActiveTagName] = React.useState(activeTag);
  const { name } = useParams();

  React.useEffect(() => {
    setActiveTagName(name);
  }, []);

  React.useEffect(() => {
    if (!name) setActiveTagName(null);
  }, [activeTag]);

  const onGetPosts = (name) => {
    dispatch(fetchActiveTag(name));
    dispatch(fetchPostsLikeTag(name));
    setActiveTagName(name);
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            key={i}
            style={{
              textDecoration: "none",
              color: activeTagName === name ? "white" : "black",
            }}
            to={`/tags/${name}`}
          >
            <ListItem
              style={{
                backgroundColor: activeTagName === name ? "#4361ee" : "white",
              }}
              key={i}
              onClick={() => {
                onGetPosts(name);
                setSearchText("");
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon
                    style={{ color: activeTagName === name ? "white" : "" }}
                  />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
