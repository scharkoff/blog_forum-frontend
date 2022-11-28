import React from "react";

// -- Components
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

// -- Material UI
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// -- React markdown
import ReactMarkdown from "react-markdown";

// -- React-redux
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// -- Axios
import axios from "../axios";

// -- Redux state
import { fetchComments } from "../redux/slices/comments";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const allComments = useSelector((state) => state.posts.comments.items);

  const dispatch = useDispatch();

  // -- Alert settings hooks
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [alertType, setAlertType] = React.useState("info");

  React.useEffect(() => {
    dispatch(fetchComments());
  }, []);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setAlertText("Ошибка при получении статьи!");
        setOpen(true);
        setAlertType("error");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

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
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt.slice(0, 10)}
        viewsCount={data.viewsCount}
        commentsCount={
          allComments
            ? allComments.filter((item) => item.post?._id === id).length
            : 0
        }
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={
          allComments
            ? allComments
                .filter((item) => item.post?._id === id)
                .map((item) => {
                  return {
                    user: {
                      userId: item.user?._id,
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
        isEditble={true}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
