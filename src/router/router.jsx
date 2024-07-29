import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Homepage from "../pages/Homepage";
import CheckPage from "../pages/CheckPage";
import DashboardLayout from "../MainLayout/DashboardLayout";
import VisaManagement from "../pages/Dashboard/VisaManagement/VisaManagement";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>, 
    children: [
        {
            path: '/',
            element: <Homepage/>
        },
        {
            path: '/check-page',
            element: <CheckPage/>
        },
        {
            path: '/check-page',
            element: <CheckPage/>
        }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
        path: "/dashboard/eVisaXXYY",
        element: <VisaManagement/>,
      },
    ]
  }
]);
