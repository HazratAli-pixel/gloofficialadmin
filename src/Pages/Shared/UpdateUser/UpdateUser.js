import React from 'react';
import toast from 'react-hot-toast';

const UpdateUser = ({ setamodalstatus, userlist, refetch }) => {
    const {name,_id, createdOn,email,password, refererId, winbalance,balance } = userlist;

    const handleBooking = async (event) => {
        event.preventDefault();
        const form = event.target;
        const refererId = form.refnumber.value;
        const balance = form.balance.value;
        const winbalance = form.winbalance.value;
        const password = form.password.value;
        setamodalstatus(null);
        const userinfo = {
            id: _id,
            refererId,
            balance,
            winbalance,
            password
        }

        fetch(`https://glo-official-server-git-main-hazratali-pixel.vercel.app/user/update/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message === "success") {
                    setamodalstatus(null);
                    toast.success('User updated');
                    refetch();
                }
                else{
                    toast.error(data.message);
                }
            })


    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={()=>setamodalstatus(null)} >✕</label>
                    <h3 className="text-lg font-bold p-2"><strong>Name: </strong> <span className='text-red-400'>{name}</span></h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-2'>
                        {/* <input type="text" name='resaleprice'   defaultValue={resalePrice} className="input w-full input-bordered " /> */}
                        <div>
                            <label className="label"> <span className="label-text font-bold">Account Open</span></label>
                            <input name="name" type="text" disabled defaultValue={createdOn.slice(0,10)} className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Number</span></label>
                            <input name="number" type="text" disabled defaultValue={email} placeholder="Your Phone number" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Referer ID</span></label>
                            <input name="refnumber" type="text" defaultValue={refererId} placeholder="Your Referer Id" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Account Balance</span></label>
                            <input name="balance" type="text" defaultValue={balance} placeholder="Your account balance" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Win Balance</span></label>
                            <input name="winbalance" type="text" defaultValue={winbalance} placeholder="Your win balance" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Password</span></label>
                            <input name="password" type="text" defaultValue={password} placeholder="Your password" className="input w-full input-bordered" />
                        </div>
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateUser;