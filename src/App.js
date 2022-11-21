import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserAccount } from './services/userService';
import {loginContext, logoutContext} from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchUser = async ()=> {
    let response = await getUserAccount();
    if(response && response.EC === 0){
        let groupWithRoles = response.DT.groupWithRoles
        let email = response.DT.email
        let username = response.DT.username
        let token = response.DT.token

        let data = {
            isAuthenticated: true,
            token,
            account: {groupWithRoles, email, username},
            isLoading: false
        }
        dispatch(loginContext(data))
    } else {
      dispatch(logoutContext())
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

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
