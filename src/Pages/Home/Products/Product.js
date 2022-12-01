import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { MdReport, MdVerifiedUser } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const Product = ({service, setamodalstatus,setreportamodal}) => {
    const {description , photoUrl, itemName, location, nagotiationFlag,originalPrice, resalePrice,usedtime, userName, userVerification, userPhoto,brand,createdOn} = service;
    const { user } = useContext(AuthContext);
    const [loadingss, setLoading] = useState(false);

    
    const wishlistadd = ()=>{
        setLoading(true)
        const wishlistinfo = {
            productId: service._id,
            userId: user.email
        }

        fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/wishlist/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishlistinfo)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                if (data.message==="Product added to wishlist") {
                    toast.success(data.message);
                }
                else{
                    toast.error(data.message);
                }
            })

    }

    return (
        <div className="card bg-base-100 border-2 shadow-lg">
         {
            loadingss? <Loading/> :""
        }
            <figure className="px-5 pt-5">
                <img src={photoUrl} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body text-left">
                <h2 className="card-title font-bold">{itemName}</h2>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h2 className=""><span className='font-bold'>Brand: </span> {brand}</h2>
                    </div>
                    <div>
                        <p className='flex flex-row items-center gap-2'> <GrLocation/> { location}</p>
                    </div>
                </div>
                <p>{description.slice(0,100)}...</p>
                <p><span className='font-bold'>Sale Price:</span> {resalePrice} tk {nagotiationFlag && <span className='text-xs italic text text-slate-400'>Negotiable</span>} </p>
                <p><span className='font-bold'>Original Price:</span> {originalPrice}</p>
                <p><span className='font-bold'>Use Time:</span> {usedtime} months</p>
                <p><span className='font-bold'>Post Date:</span> {createdOn.slice(0,10)}</p>
                <div className='bg-red-100 rounded-lg border-2 border-red-300'>
                    <div className='flex flex-row gap-3 p-2 items-center'>
                        <div>
                            <img className='rounded-full border-2 border-black max-h-10 max-w-10' src={userPhoto} alt="" />
                        </div>
                        <div>
                            <p className='flex flex-row items-center gap-2'><span className='font-bold'>Saler name:</span></p>
                            <p className='flex flex-row items-center gap-2'> {userName} {userVerification && <div className='tooltip' data-tip="Verified Saler"><MdVerifiedUser/></div>}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-footer p-2 flex flex-row justify-between px-5 bg-slate-200 rounded-b-lg'>
                {
                    user? <>
                    <label className='flex flex-row items-center gap-2  text-green-800 font-bold' onClick={()=>{wishlistadd()}}>Wishlist <span className='tooltip' data-tip="Add to your wishlist for future purchase"><BsFillBookmarkPlusFill/></span></label>
                <label className='flex flex-row items-center gap-2 text-orange-400' htmlFor="report-modal" onClick={()=>{setreportamodal(service) }}>Report <span className='tooltip' data-tip="Report to admin if you found anything wrong"><MdReport/></span></label> 
                <label className="btn-info p-2 rounded-lg" htmlFor="booking-modal" onClick={()=>{setamodalstatus(service)}}>Book Now</label> 
                    </> : <Link to='/login' className='flex   flex-row items-center gap-2  text-green-800 font-bold' onClick={()=>{wishlistadd()}}>Log in for Book <span className='tooltip' data-tip="Click for login"><BsFillBookmarkPlusFill/></span></Link>
                }
            </div>
        </div>
    );
};

export default Product;