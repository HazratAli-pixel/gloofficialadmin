
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';


const Profile = () => {
    useTitle('Profile')
    const {user, emailverify} = useContext(AuthContext)
    const emailvery = ()=>{
        emailverify()
        .then(result =>{
            toast("Verification Email send. Check your inbox / spam folder");
            })
    }
    return (
        <div className='p-1'>
            <div className='w-full mt-3 rounded-lg bg-slate-50 border-2 border-slate-400'>
            <div className='flex py-3 flex-col '>
                <div className='px-2 flex justify-center'>
                    <img className='rounded-full max-h-40 max-w-40' src={user?.photoURL} alt="" />
                </div>
                <div className='flex flex-col justify-center '>
                    <h1 className='p-2 m-0 text-2xl text-center'> <strong>Name : </strong> {user?.displayName}</h1>
                    <p className='p-2 m-0 text-center'> <strong>Email :</strong> {user?.email}</p>
                    {/* <p className='p-3 m-0 text-center'> <strong>Verificaiton : </strong> {user?.emailVerified? "Verified User":<button className='btn btn-outline' onClick={emailvery}>Verify your email</button>}</p> */}
                    <div className='flex justify-center'>
                    <label htmlFor="my-modal-4"  className='btn btn-primary modal-button'>Upate Profile</label>
                    </div>
                </div>
            </div>
            </div>
            <div>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <div className='px-2 flex justify-center'>
                            <img className='rounded-full max-h-40 max-w-40' src={user?.photoURL} alt="" />
                        </div>
                        <h3 className="text-lg font-bold">Update Profile</h3>
                        <p className="py-2">sorry...update comming soon</p>
                        <p className="py-2">Thank you</p>
                        <button className='btn btn-success'>update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;