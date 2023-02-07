import React, { useState } from "react";

// -- Redux state
import store from "../../redux/store";

// -- Components
import { Post } from "../../components/Post";
import { SearchString } from "../SearchString";

// -- React-redux
import { useSelector } from "react-redux";
import { AlertMessage } from "../AlertMessage";

export const Posts = () => {
  // -- Redux state
  const state = store.getState();

  // -- Комментарии и посты в стейте
  const { posts } = state.posts;

  // -- Посты
  const [postsArray, setPostsArray] = React.useState([]);
  const [copyOfPosts, setCopyOfPosts] = React.useState([]);

  React.useEffect(() => {
    if (posts.items) {
      setPostsArray(posts.items);
      setCopyOfPosts(posts.items);
    }
  }, [posts.items]);

  // -- User data
  const userData = useSelector((state) => state.auth.data);

  // -- Загружаются ли посты
  const isPostsLoading = posts.status === "loading";

  // -- Уведомление
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  return (
    <div>
      <AlertMessage
        message={alertText}
        type={alertType}
        open={open}
        setOpen={setOpen}
      />

      <SearchString setPostsArray={setPostsArray} copyOfPosts={copyOfPosts} />

      {(isPostsLoading ? [...Array(5)] : postsArray).map((obj, index) =>
        isPostsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            key={index}
            id={obj._id}
            title={obj.title}
            imageUrl={
              obj.imageUrl
                ? `${process.env.REACT_APP_API_URL || "http://localhost:4444"}${
                    obj.imageUrl
                  }`
                : ""
            }
            user={obj.user}
            createdAt={obj.createdAt.slice(0, 10)}
            viewsCount={obj.viewsCount}
            commentsCount={obj.commentsCount}
            tags={obj.tags}
            isEditable={userData?._id === obj?.user?._id}
            setOpen={setOpen}
            setAlertText={setAlertText}
            setAlertType={setAlertType}
          />
        )
      )}
    </div>
  );
};
