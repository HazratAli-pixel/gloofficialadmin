import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Alldeposit from "../../Pages/Dashboard/AllUsers/Alldeposit";
import Results from "../../Pages/Dashboard/AllUsers/AllResult";
import Tickets from "../../Pages/Dashboard/AllUsers/Alltickets";
import Tips from "../../Pages/Dashboard/AllUsers/Alltips";
import Tutorial from "../../Pages/Dashboard/AllUsers/Alltutorial";
import AllUser from "../../Pages/Dashboard/AllUsers/AllUser";
import Withdraw from "../../Pages/Dashboard/AllUsers/Allwithdraw";


import MyOrders from "../../Pages/Dashboard/BuyerPages/MyOrders";
import MyWishlist from "../../Pages/Dashboard/BuyerPages/MyWishlist";
import MyProducts from "../../Pages/Dashboard/SalerPage/MyProducts";
import Login from "../../Pages/Login/Login";
import Profile from "../../Pages/Profile/Profile";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element:  <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/alluser',
                element: <PrivateRoute><AllUser></AllUser></PrivateRoute>,
            },
            {
                path: '/deposit',
                element: <PrivateRoute><Alldeposit></Alldeposit></PrivateRoute>,
            },
            {
                path: '/tickets',
                element: <PrivateRoute><Tickets></Tickets></PrivateRoute>
            },
            {
                path: '/withdraw',
                element: <PrivateRoute><Withdraw></Withdraw></PrivateRoute>
            },
            {
                path: '/result',
                element: <PrivateRoute><Results></Results></PrivateRoute>
            },
            {
                path: '/tips',
                element: <PrivateRoute><Tips></Tips></PrivateRoute>
            },
            {
                path: '/tutorial',
                element: <PrivateRoute><Tutorial></Tutorial></PrivateRoute>
            },
            {
                path: '/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/wishlist',
                element: <MyWishlist></MyWishlist>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            }
        ]
    }
])

export default router;