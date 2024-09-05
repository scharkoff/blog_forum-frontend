import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Posts.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Post } from 'components/Post';
import { gql, useQuery } from '@apollo/client';

// GraphQL Query
const GET_POSTS = gql`
  query GetPosts($page: Int, $pageSize: Int, $sortType: String, $tag: String) {
    getPosts(page: $page, pageSize: $pageSize, sortType: $sortType, tag: $tag) {
      posts {
        _id: id
        title
        imageUrl
        user {
          _id: id
          fullName
          avatarUrl
          rank
        }
        createdAt
        viewsCount
        commentsCount
        tags
      }
      postsCount
    }
  }
`;

export const PostsPagination = React.memo(() => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 5;

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      page: currentPage + 1, // GraphQL нумерация страниц начинается с 1
      pageSize: itemsPerPage,
      sortType: 'latest',
      tag: null,
    },
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    refetch(); // Перезагружаем данные при смене страницы
  };

  if (loading) {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <Post key={index} isLoading={true} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error loading posts</p>;
  }

  const { posts, postsCount } = data.getPosts;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={
                post.imageUrl
                  ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
                  : ''
              }
              user={post.user}
              createdAt={post.createdAt.slice(0, 10)}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount}
              tags={post.tags}
              isEditable={true /* замените на проверку пользователя */}
            />
          ))}
      </>
    );
  }

  const pageCount = Math.ceil(postsCount / itemsPerPage);

  return (
    <>
      <Items currentItems={posts.slice(0, itemsPerPage)} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<NavigateNextIcon />}
        onPageChange={handlePageClick}
        forcePage={currentPage}
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
});
