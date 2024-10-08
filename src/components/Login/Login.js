import './Login.scss';
import {Link, useHistory} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';


function Login(props) {
    const {user, loginContext} = useContext(UserContext);
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInpput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInpput);
    const handleCreateNewAccount = () => {
        history.push("/register");
    }
    const handleLogin = async() => {
        setObjValidInput(defaultObjValidInpput);

        if(!valueLogin){
            setObjValidInput({...defaultObjValidInpput, isValidValueLogin: false})
            toast.error("Please enter your email address or phone number");
            return;
        }
        if(!password){
            setObjValidInput({...defaultObjValidInpput, isValidPassword: false})
            toast.error("Please enter your password");
            return;
        }

        let response = await loginUser(valueLogin, password);
        console.log(response);

        if(response && +response.EC===0){
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.token;

            let data = {
                isAuthenticated: true,
                token,
                account: {groupWithRoles, email, username}
            }
            localStorage.setItem("jwt", token);
            loginContext(data);
            history.push('/users');
            // window.location.reload();
            //redux

        }

        if(response && +response.EC!==0){
            //error
            toast.error(response.EM);
        }
    };
    useEffect(()=>{
        if(user && user.isAuthenticated){
            history.push('/');
        }
    }, [])
    return (  
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            <Link to="/"><span title='Return to HomePage'>Hoi Dan It</span></Link>
                        </div>
                        <div className="detail">
                            Hoi Dan It helps you to connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            Hoi Dan It
                        </div>
                        <input  
                            type="text" 
                            className={objValidInput.isValidValueLogin? 'form-control' : 'form-control is-invalid'}
                            placeholder="Email address or phone number"
                            onChange={(e=>{setValueLogin(e.target.value)})}
                        />
                        <input 
                            type="password" 
                            className={objValidInput.isValidPassword? 'form-control' : 'form-control is-invalid'}
                            placeholder="Password"
                            onChange={(e=>{setPassword(e.target.value)})}
                        />
                        <button className="btn btn-primary" onClick={()=>handleLogin()}>Login</button>
                        <span className="text-center">
                            <a href='forgot-password'>Forgot your password?</a>
                        </span>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={()=>handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                        <div className='mt-3 return'>
                            <Link to="/">
                                <i className='fa fa-arrow-circle-left'></i>
                                <span title='Return to HomePage'>Return to HomePage</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;