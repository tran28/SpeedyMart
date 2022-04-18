import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const jwt = localStorage.getItem("jwtToken");
    return jwt ? children : <Navigate to="/account/login" />;
};

export default PrivateRoute;