import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({Component}) {
    const { isAuth } = useSelector((state) => state.auth);
    return isAuth ? <Component /> : <Navigate to='/login' />;
  }