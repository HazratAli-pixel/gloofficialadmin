import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    return (
        <div >
            <Navbar></Navbar>
            <div className="drawer drawer-mobile container mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-green-100">
                    <Outlet></Outlet>
                </div>
                {
                    user && <div className="drawer-side bg-red-200 ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><NavLink className='font-bold' to="/">My Profile</NavLink></li>
                        <li><NavLink className='font-bold' to="/alluser">User List</NavLink></li>
                        <li><NavLink className='font-bold' to="/deposit">Deposit list</NavLink></li>
                        <li><NavLink className='font-bold' to="/tickets">Ticket list</NavLink></li>
                        <li><NavLink className='font-bold' to="/withdraw">Withdraw list</NavLink></li>
                        <li><NavLink className='font-bold' to="/result">Result list</NavLink></li>
                        <li><NavLink className='font-bold' to="/tips">Tips list</NavLink></li>
                        <li><NavLink className='font-bold' to="/tutorial">Video list</NavLink></li>
                        <li><NavLink className='font-bold' to="/reportedproucts">Add Video</NavLink></li>
                        <li><NavLink className='font-bold' to="/reportedproucts">Popup manage</NavLink></li>
                        <li><NavLink className='font-bold' to="/reportedproucts">Deposit msg Manage</NavLink></li>
                        <li><NavLink className='font-bold' to="/reportedproucts">Count Down</NavLink></li>
                    </ul>
                </div>
                }
            </div>
        </div>
    );
};

export default DashboardLayout;