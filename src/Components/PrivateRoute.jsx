import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../Redux/Auth/auth.actions';
import { toast } from 'react-toastify';

export default function PrivateRoute({Component}) {
  // const dispatch  = useDispatch()
    const { isAuth } = useSelector((state) => state.auth);
    // useEffect(()=>{
    //   dispatch(getUser());
    //  },[])

    if(!isAuth) {
      toast.warning("Please Login");
    }
    return isAuth ? <Component /> : <Navigate to='/login' />;
  }