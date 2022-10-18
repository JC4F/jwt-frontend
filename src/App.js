import './App.scss';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import AppRoute from './routes/AppRoutes';

function App() {
  const [account, setAccount] = useState({});

  useEffect(()=>{
    let session = sessionStorage.getItem('account');
    if(session) {
      setAccount(JSON.parse(session));
    }
  }, [])
  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav/>
        </div>
        <div className='app-container'>
          <AppRoute/>
        </div>
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
