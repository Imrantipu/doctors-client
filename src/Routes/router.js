import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Appointment from "../Pages/Apppintment/Appointment/Appointment";
import Home from "../Pages/Home/Home/Home";

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
        }
    ],
  },


]);