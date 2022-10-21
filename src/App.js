import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import AppRoute from './routes/AppRoutes';
import { UserContext } from './context/UserContext';
import { Rings } from 'react-loader-spinner';

function App() {
  const {user} = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              height="100"
              width="100"
              color='#1877f2'
              ariaLabel='loading'
            />
            <div>Loading data...</div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader/>
            </div>
            <div className='app-container'>
              <AppRoute/>
            </div>
          </>
        }
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
