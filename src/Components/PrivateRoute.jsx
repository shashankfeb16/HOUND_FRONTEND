import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../Redux/Auth/auth.actions';

export default function PrivateRoute({Component}) {
  // const dispatch  = useDispatch()
    const { isAuth } = useSelector((state) => state.auth);
    // useEffect(()=>{
    //   dispatch(getUser());
    //  },[])
    return isAuth ? <Component /> : <Navigate to='/login' />;
  }