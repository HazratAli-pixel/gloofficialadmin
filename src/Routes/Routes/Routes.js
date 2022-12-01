import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllUsers/AllBuers";
import AllSalers from "../../Pages/Dashboard/AllUsers/AllSalers";
import MyOrders from "../../Pages/Dashboard/BuyerPages/MyOrders";
import MyWishlist from "../../Pages/Dashboard/BuyerPages/MyWishlist";
import ReportedProducts from "../../Pages/Dashboard/ReportedProducts/ReportedProducts";
import MyProducts from "../../Pages/Dashboard/SalerPage/MyProducts";
import Blog from "../../Pages/Home/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Profile from "../../Pages/Profile/Profile";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import DisplayProducts from "../../Pages/Shared/DisplayProducts/DisplayProducts";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'category/:category',
                loader: async ({params})=>{
                    return fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/products/category/${params.category}`)
                },
                element: <PrivateRoute><DisplayProducts></DisplayProducts></PrivateRoute> ,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Profile></Profile>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allsalers',
                element: <AdminRoute><AllSalers></AllSalers></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/reportedproucts',
                element: <AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/wishlist',
                element: <MyWishlist></MyWishlist>
            }
        ]
    }
])

export default router;