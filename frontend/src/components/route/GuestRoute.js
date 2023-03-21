import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function GuestRoute({children}){

    const {isAuthenticated} =    useSelector((state) => state.authState)
    
    if(isAuthenticated) {
        return <Navigate to="/" />
    }
    return children;
}