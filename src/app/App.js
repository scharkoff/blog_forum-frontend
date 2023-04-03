import React from 'react';

import Container from '@mui/material/Container';

import { useDispatch } from 'react-redux';

import { fetchAuthMe } from 'redux/slices/auth';
import { setIsMobile } from 'redux/slices/utils';
import { AllRoutes } from './routes';
import { Header } from 'modules/Header';
import { Loader } from 'components';

function App() {
  const dispatch = useDispatch();

  const [width, setWidth] = React.useState(window.innerWidth),
    [openLoader, setOpenLoader] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const response = await dispatch(fetchAuthMe());
      if (response)
        setTimeout(() => {
          setOpenLoader(false);
        }, 1000);
    })();
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  React.useEffect(() => {
    width <= 768 ? dispatch(setIsMobile(true)) : dispatch(setIsMobile(false));
  }, [width]);

  return (
    <>
      <Loader open={openLoader} />
      <Header />
      <Container maxWidth="lg">
        <AllRoutes />
      </Container>
    </>
  );
}

export default App;
