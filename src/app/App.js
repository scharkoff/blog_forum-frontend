import React from 'react';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from 'redux/slices/auth';
import { setIsMobile } from 'redux/slices/utils';
import { AllRoutes } from './routes';
import { Header, Footer } from 'modules';
import { fetchTags } from 'redux/slices/tags';
import { fetchLastsComments } from 'redux/slices/comments';
import { Loader } from 'components';

function App() {
  const dispatch = useDispatch();

  const [width, setWidth] = React.useState(window.innerWidth);

  const { loader } = useSelector((state) => state.utils);

  React.useEffect(() => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token') !== 'undefined'
    ) {
      dispatch(fetchAuthMe());
    }
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    dispatch(fetchTags());
    dispatch(fetchLastsComments());

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  React.useEffect(() => {
    width <= 768 ? dispatch(setIsMobile(true)) : dispatch(setIsMobile(false));
  }, [width]);

  return (
    <>
      <Loader open={loader} />

      <Header />

      <Container maxWidth="lg">
        <AllRoutes />
      </Container>

      <Footer />
    </>
  );
}

export default App;
