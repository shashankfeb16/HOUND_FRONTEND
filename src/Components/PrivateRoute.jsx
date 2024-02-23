import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../Redux/Auth/auth.actions';
import { toast } from 'react-toastify';

export default function PrivateRoute({Component}) {
  
    const { isAuth } = useSelector((state) => state.auth);
    

    // if(!isAuth) {
    //   toast.warning("Please Login");
    // }
    return isAuth ? <Component /> : <Navigate to='/' />;
  }