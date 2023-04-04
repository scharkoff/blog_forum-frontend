import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Posts.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Post } from 'components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'redux/slices/posts';
import { setActivePage } from 'redux/slices/utils';

export const PostsPagination = ({ posts }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth.data);
  const { postsCount } = useSelector((state) => state.posts.posts);
  const { activeTabs, activePage } = useSelector((state) => state.utils);
  const { activeTag } = useSelector((state) => state.posts.tags);

  React.useEffect(() => {
    dispatch(
      fetchPosts({
        pageOptions: [activePage + 1, 5],
        activeTabs,
        tagName: activeTag,
      }),
    );
  }, [activePage, activeTabs, activeTag]);

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
    const currentItems = posts.slice(0, 5);
    const pageCount = Math.ceil(postsCount / itemsPerPage) || 1;

    const handlePageClick = (event) => {
      dispatch(setActivePage(event.selected));
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
