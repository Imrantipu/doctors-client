import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Appointment from "../Pages/Apppintment/Appointment/Appointment";
import DashBoard from "../Pages/DashBoard/DashBoard/DashBoard";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
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
    path :"dashboard",
    element : <PrivateRouter><DashBoard></DashBoard></PrivateRouter>
  },


]);