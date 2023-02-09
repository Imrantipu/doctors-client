import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Appointment from "../Pages/Apppintment/Appointment/Appointment";
import AddDoctor from "../Pages/DashBoard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import ManageDoctors from "../Pages/DashBoard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Pages/DashBoard/MyAppointment/MyAppointment";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import DisplayError from "../Pages/Shared/DisplayError";
import Payment from "../Payment/Payment";
import SignUp from "../SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRouter from "./PrivateRouter/PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard/myappointments",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managedoctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);
