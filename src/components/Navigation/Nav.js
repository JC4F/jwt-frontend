import React, { useContext, useEffect, useState } from "react";
import './Nav.scss';
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Nav(props) {
    const {user} = useContext(UserContext);
    let location = useLocation();
    // useEffect(()=>{
    //     if(location.pathname === '/login'){
    //         setIsShow(false);
    //     }
    // },[]);
    if(user && user.isAuthenticated === true || location.pathname === '/'){
        return (  
            <>
                {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>}
            </>
        );
    }
    else {
        return <></>
    }
}

export default Nav;