import { Outlet } from "react-router";
import Navber from "../components/shared/Navbar/Navber";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <div className='min-h-[calc(100vh-132px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;