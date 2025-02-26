import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <LoadingSpinner />
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
    children: PropTypes.element,
}

export default PrivateRoute;

