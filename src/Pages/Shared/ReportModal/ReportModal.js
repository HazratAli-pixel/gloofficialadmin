import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const ReportModal = ({ setreportamodal, refetch, reportmodal}) => {
    const {itemName, photoUrl,_id } = reportmodal;

    const { user } = useContext(AuthContext);
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const openion = form.openion.value;

        const reportinfo = {
            reportFlag: true,
            reportMsg: openion
        }

        fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/products/report/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reportinfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    setreportamodal(null);
                    toast.success('Item is reported');
                    refetch();
                }
                else{
                    toast.error(data.message);
                }
            })


    }
    return (
        <>
            <input type="checkbox" id="report-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="report-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <figure>
                        <img src={photoUrl} alt="" className='rounded-lg' />
                    </figure>
                    <h3 className="text-lg font-bold p-2"><strong>Name:</strong> {itemName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-2'>
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <textarea name='openion' defaultValue={''} placeholder='Write your openio here' className='border-2 p-2 rounded-lg resize-none' onResize={false} rows={3}/>
                        {/* <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" /> */}
                        
                        <input className='btn btn-accent w-full' type="submit" value="Submit Report" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ReportModal;