import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getConnection, removeConnection } from './store/slices/connectionSlice.ts';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { getRoutes, subscribeToWS } from './utils/utils.tsx';
import { FunctionComponent } from 'react';
import Loader from './components/common/loader.tsx';

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const connection = useAppSelector(getConnection);
  const isAuthenticated = connection.isAuthenticated;
  useEffect(() => {
    subscribeToWS();
    return () => {
      dispatch(removeConnection());
    };
  }, [dispatch]);
  const router = createBrowserRouter(getRoutes(isAuthenticated));

  return (
    <>
      <RouterProvider fallbackElement={<Loader />} router={router} />
      <ToastContainer
        position="top-center"
        autoClose={200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        //rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

export default App;
