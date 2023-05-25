import React from 'react';
import Cookies from 'js-cookie';
import {Navigate, useLocation, useNavigate} from "react-router-dom";

function checkIfCuiGood() {
    console.log(Cookies.get('zurli'))
    if(Cookies.get('zurli') !== undefined){
           return true;
    }
    else {
           return false;
    }
}

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const {children} = props
    const navigate = useNavigate()
    const location = useLocation()

    return checkIfCuiGood() ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/login"
            state={{from: `${location.pathname}${location.search}`}}
        />
    )
}

export default PrivateRoute;