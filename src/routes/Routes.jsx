import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import EmployeeSignup from "../pages/Signup/EmployeeSignup";
import HRManagerSignup from "../pages/Signup/HRManagerSignup";
import PrivateRoute from "./PrivateRoute";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import HrManagerDashboard from "../components/Dashboard/HrManagerDashboard";
import Profile from "../pages/Employee/Profile";
import HRProfile from "../pages/HR/HRProfile";
import AddAssetForm from "../pages/HR/AddAssetForm";
import AssetsList from "../pages/HR/AssetsList";

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
        path: '/empsignup',
        element: <EmployeeSignup></EmployeeSignup>
    },
    {
        path: '/hrsignup',
        element: <HRManagerSignup></HRManagerSignup>
    },
    {
        path:'/empdashboard',
        element: (
            <PrivateRoute>
                <EmployeeDashboard></EmployeeDashboard>
            </PrivateRoute>
        )
    },
    {
        path:'/empprofile',
        element: (
            <PrivateRoute>
                <Profile></Profile>
            </PrivateRoute>
        )
    },
    {
        path:'/hrdashboard',
        element: (
            <PrivateRoute>
                <HrManagerDashboard></HrManagerDashboard>
            </PrivateRoute>
        )
    },
    {
        path:'/addasset',
        element: (
            <PrivateRoute>
                <AddAssetForm></AddAssetForm>
            </PrivateRoute>
        )
    },
    {
        path:'/assetlist',
        element: (
            <PrivateRoute>
                <AssetsList></AssetsList>
            </PrivateRoute>
        )
    },
    {
        path: '/hrprofile',
        element: (
            <PrivateRoute>
                <HRProfile></HRProfile>
            </PrivateRoute>
        )
    }
])