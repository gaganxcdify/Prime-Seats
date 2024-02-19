import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    const AuthRequired = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const isAuthenticated = sessionStorage.getItem("token");
            console.log(isAuthenticated);
            if (!isAuthenticated) {
                navigate("/");
            }
        }, []);

        return React.createElement(WrappedComponent, props);
    };

    return AuthRequired;
};

export default withAuth;