import React from 'react';
import { useContext} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from './../../hooks/useAdmin';

const AdminRoute = ({ children }) => {

    const {user,loading} = useContext(AuthContext);
    const [isAdmin,isAdminLoading] = useAdmin(user?.email);
    let location = useLocation();

    if(loading || isAdminLoading){
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children;
      }
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

export default AdminRoute;