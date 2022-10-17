import { useHistory } from 'react-router-dom';
import './Register.scss'
function Register(props) {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }
    return (  
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Hoi Dan It
                        </div>
                        <div className="detail">
                            Hoi Dan It helps you to connect and share with the people in your life.
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            Hoi Dan It
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="Email"/>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="email" className="form-control" placeholder="Phone number"/>
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="email" className="form-control" placeholder="Username"/>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="email" className="form-control" placeholder="Password"/>
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="email" className="form-control" placeholder="Re-enter password"/>
                        </div>
                        <button className="btn btn-primary">Register</button>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={()=>handleLogin()}>
                                Already have an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;