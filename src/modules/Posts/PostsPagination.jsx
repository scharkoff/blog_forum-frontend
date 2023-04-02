import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Posts.module.scss';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Post } from 'components/Post';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'configs/axios/axios';
import { fetchPosts } from 'redux/slices/posts';

export const PostsPagination = () => {
  const dipatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { postsCount } = useSelector((state) => state.posts.posts);
  const { activeTabs } = useSelector((state) => state.utils);

  const [data, setData] = React.useState([]);
  const [activePage, setActivePage] = React.useState(0);

  React.useEffect(() => {
    console.log('Data', data);
  }, [data]);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    dipatch(fetchPosts({ pageOptions: [activePage + 1, 5], activeTabs }));

    axios
      .get(
        `/posts?page=${activePage + 1}&pageSize=5&sortType=${
          activeTabs.activeType
        }`,
        {
          signal,
        }
      )
      .then(({ data }) => {
        setData(data.posts);
      });

    return () => abortController.abort();
  }, [activePage, activeTabs]);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((post, index) => (
            <Post
              key={index}
              id={post._id}
              title={post.title}
              imageUrl={
                post.imageUrl
                  ? `${
                      process.env.REACT_APP_API_URL || 'http://localhost:4444'
                    }${post.imageUrl}`
                  : ''
              }
              user={post.user}
              createdAt={post.createdAt.slice(0, 10)}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable={userData?._id === post.user?._id}
            />
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const currentItems = data.slice(0, 5);
    const pageCount = Math.ceil(postsCount / itemsPerPage) || 1;

    const handlePageClick = (event) => {
      setActivePage(event.selected);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NavigateNextIcon />}
          onPageChange={handlePageClick}
          forcePage={activePage}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<NavigateBeforeIcon />}
          renderOnZeroPageCount={null}
          containerClassName={styles.paginationWrapper}
          pageClassName={styles.currentPage}
          pageLinkClassName={styles.currentPageLink}
          previousClassName={styles.prevPage}
          previousLinkClassName={styles.prevLink}
          nextClassName={styles.nextPage}
          nextLinkClassName={styles.nextLink}
          activeClassName={styles.activePage}
          disabledClassName={styles.disabled}
        />
      </>
    );
  }

  return <PaginatedItems itemsPerPage={5} />;
};
