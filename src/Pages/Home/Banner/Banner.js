import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import buy_sale from '../../../assets/images/4530211_19198.jpg';
import { AuthContext } from '../../../contexts/AuthProvider';
const Banner = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <div className='rounded-lg lg:w-1/2 shadow-2xl shadow-emerald-300'>
                    <img src={buy_sale} className="rounded-lg" alt='' />
                </div>
                <div className='w-1/2'>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold animate-bounce">Buye & Sale Laptops</h1>
                    <p className="py-6 text-lg md:text-2xl lg:text-2xl">Buy, sell and find your desire laptops from here easly. Buy products from the right person.</p>
                    {
                        user? "": 
                        <div className='flex flex-row justify-center gap-3'>
                            <Link to='/login' className='btn btn-primary hover:btn-success '>Login</Link>
                        <Link to='/signup' className='btn btn-outline '>Sign Up</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Banner;