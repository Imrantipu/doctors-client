import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Appointment from "../Pages/Apppintment/Appointment/Appointment";
import AddDoctor from "../Pages/DashBoard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import MyAppointment from "../Pages/DashBoard/MyAppointment/MyAppointment";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRouter from "./PrivateRouter/PrivateRouter";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Main></Main>,
    children :[
        {
            path:"/",
            element:<Home></Home>,
        },
        {
          path:"/appointment",
          element:<Appointment></Appointment>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signup",
          element:<SignUp></SignUp>
        },
    ],
  },

  {
    path :"/dashboard",
    element : <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
    children : [
       
           {
            path : "/dashboard/myappointments",
            element : <MyAppointment></MyAppointment>
           },
           {
            path : "/dashboard/allusers",
            element : <AdminRoute><AllUsers></AllUsers></AdminRoute>
           },
           {
            path : "/dashboard/adddoctor",
            element : <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
           },
    ],
  },


]);