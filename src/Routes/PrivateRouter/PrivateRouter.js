import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRouter = ({ children }) => {

    const {user,loading} = useContext(AuthContext);
    let location = useLocation();

    if(loading){
        return <Loader></Loader>
    }

    if (user) {
        return children;
      }
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

export default PrivateRouter;