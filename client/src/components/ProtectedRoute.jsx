import { Children } from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ Children, role}) => {
    const user = JSON.parse(localStorage.getItem("user"));


    if(!user) return <Navigate to="/login"/>;
    if(role && user.role !== role) return <Navigate to="/"/>;

    return Children;
};

export default ProtectedRoute;