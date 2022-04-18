import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
    const admin = localStorage.getItem("admin");
    return admin ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedAdmin;