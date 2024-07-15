import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../contexts/ContextsProvider";


export default function GuestLayout(){

    const {token} = useContext(StateContext)

    if(token){
        if(window.location == 'http://localhost:5173/login' || window.location == 'http://localhost:5173/signup'){
            return <Navigate to='/' />
        }
    }

    return(
        <>
        
        <Outlet />
        
        </>
    )
}