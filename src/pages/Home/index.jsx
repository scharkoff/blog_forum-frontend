import React from "react";

// -- Material UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// -- Components
import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock";
import { SearchString } from "../../components/SearchString";

// -- React-redux
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// -- Redux state
import store from "../../redux/store";
import { fetchPosts, fetchSortedPosts } from "../../redux/slices/posts";
import { fetchTags, fetchSortedPostsLikeTag } from "../../redux/slices/tags";
import { fetchComments } from "../../redux/slices/comments";
import { fetchAuthMe } from "../../redux/slices/auth";

export const Home = () => {
  // -- Redux dispatch
  const dispatch = useDispatch();

  // -- Redux state
  const state = store.getState();

  // -- Комментарии и посты в стейте
  const { comments, posts } = state.posts;

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  // -- Отсорированные комментарии
  const sortedComments = [].concat(comments.items);

  // -- Посты
  const [postsArray, setPostsArray] = React.useState([]);
  const [copyOfPosts, setCopyOfPosts] = React.useState([]);

  React.useEffect(() => {
    if (posts.items) {
      setPostsArray(posts.items);
      setCopyOfPosts(posts.items);
    }
  }, [posts.items]);

  // -- Теги
  let { tags } = useSelector((state) => state.posts);

  // -- User data
  const userData = useSelector((state) => state.auth.data);

  // -- На главной ли странице
  const isHomePage = useSelector((state) => state.posts.posts.home);

  // -- Актуальный тег
  const { name } = useParams();

  // -- useState
  const [activeTab, setActiveTab] = React.useState(0);

  // -- Загружаются ли посты
  const isPostsLoading = posts.status === "loading";

  // -- useEffect
  React.useEffect(() => {
    document.title = "Главная страница";
    name
      ? dispatch(fetchSortedPostsLikeTag({ activeTab, name }))
      : dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    dispatch(fetchAuthMe());
  }, []);

  // -- Текст в поисковой строке
  const [searchText, setSearchText] = React.useState("");

  // -- Functions
  // -- Обработка клика по выбранному тегу
  const onSortPosts = (value) => {
    setSearchText("");
    value === 1 ? setActiveTab(1) : setActiveTab(0);
    if (name) {
      dispatch(fetchSortedPostsLikeTag({ value, name }));
    } else dispatch(fetchSortedPosts(value));
  };

  return (
    <>
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
      <Tabs value={activeTab} aria-label="basic tabs example">
        <Tab
          onClick={() => {
            onSortPosts(0);
            setSearchText("");
          }}
          label="Новые"
        />
        <Tab
          onClick={() => {
            onSortPosts(1);
            setSearchText("");
          }}
          label="Популярные"
        />
      </Tabs>

      <SearchString
        searchText={searchText}
        setSearchText={setSearchText}
        setPostsArray={setPostsArray}
        copyOfPosts={copyOfPosts}
        type={"posts"}
      />
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
                    ? `${
                        "https://sharkov-blog.onrender.com" ||
                        "http://localhost:4444"
                      }${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt.slice(0, 10)}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj?.user?._id}
                alert={{ setAlertText, setAlertType, setOpen }}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            setSearchText={setSearchText}
            isHomePage={isHomePage}
            items={tags.items ? tags.items : []}
            isLoading={false}
          />
          <CommentsBlock
            items={
              comments.items
                ? sortedComments
                    .reverse()
                    .slice(0, 5)
                    .map((item) => {
                      return {
                        user: {
                          fullName: item.user?.fullName,
                          avatarUrl: item.user?.avatarUrl,
                          rank: item.user?.rank,
                        },
                        text: item.text,
                        commentId: item._id,
                      };
                    })
                : []
            }
            isLoading={false}
            isEditable={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
