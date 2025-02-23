import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import EmployeeSignup from "../pages/Signup/EmployeeSignup";
import HRManagerSignup from "../pages/Signup/HRManagerSignup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/empsignup',
        element: <EmployeeSignup></EmployeeSignup>
    },
    {
        path: '/hrsignup',
        element: <HRManagerSignup></HRManagerSignup>
    },
])