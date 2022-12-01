import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div >
            <Navbar></Navbar>
            <div className="drawer drawer-mobile container mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-green-100">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side bg-red-300">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link className='font-bold' to="/dashboard">My Profile</Link></li>
                        {
                            isAdmin === "Admin" && <>
                                <li><Link className='font-bold' to="/dashboard/allbuyer">All Buser</Link></li>
                                <li><Link className='font-bold' to="/dashboard/allsalers">All Salers</Link></li>
                                <li><Link className='font-bold' to="/dashboard/reportedproucts">Reported Products</Link></li>
                            </>
                            
                        }
                        {
                            isAdmin === "Saler" && <>
                                <li><Link className='font-bold' to="/dashboard/myproducts">My Products</Link></li>
                                <li><Link className='font-bold' to="/dashboard/addproduct">Add Product</Link></li>
                                {/* <li><Link className='font-bold' to="/dashboard/managedoctors">My Buyers</Link></li> */}
                            </>
                            
                        }
                        {
                            isAdmin === "Buyer" && <>
                                <li><Link className='font-bold' to="/dashboard/myorders">My Orders</Link></li>
                                <li><Link className='font-bold' to="/dashboard/wishlist">My Wishlist</Link></li>
                            </>
                            
                        }
                      

                    </ul>

                </div>
            </div>
            {
                isAdmin === "Buyer"  && <>
                    <Footer></Footer>
                </>
            }
            {
                isAdmin === "Saler"  && <>
                    <Footer></Footer>
                </>
            }
        </div>
    );
};

export default DashboardLayout;