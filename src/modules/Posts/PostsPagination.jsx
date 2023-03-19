import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Posts.module.scss';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Post } from 'components/Post';
import { useSelector } from 'react-redux';

export const PostsPagination = ({ postsArray }) => {
  const userData = useSelector((state) => state.auth.data);

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
              isEditable={userData?._id === post?.user?._id}
            />
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = React.useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = postsArray.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(postsArray.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % postsArray.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NavigateNextIcon />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
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
