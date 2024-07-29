import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div className="overflow-x-auto">
      <Navbar />
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
