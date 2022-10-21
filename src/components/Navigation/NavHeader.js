import React, { useContext, useEffect, useState } from "react";
import './Nav.scss';
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../logo.svg';
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userService";

function NavHeader(props) {
    const {user, logoutContext} = useContext(UserContext);
    let location = useLocation();
    const history = useHistory();

    const handleLogout = async()=>{
        let data = await logoutUser();
        localStorage.removeItem('jwt');
        logoutContext();

        if(data && +data.EC === 0){
            toast.success('Log out succeed...');
            history.push('/login');
        } else {
            toast.error(data.EM);
        }
    }

    if(user && user.isAuthenticated === true || location.pathname === '/'){
        return (  
            <>
                <div className="nav-header">
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img 
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                                <span className="brand-name"></span> React
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse>
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                    <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                    <NavLink to="/group-role" className="nav-link">Group Role</NavLink>
                                    <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated == true?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.account.username} !
                                            </Nav.Item>
                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item>Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider/>
                                                <NavDropdown.Item>
                                                    <span onClick={()=> handleLogout()}>Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className="nav-link" to='/login'>
                                            Login
                                        </Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    }
    else {
        return <></>
    }
}

export default NavHeader;