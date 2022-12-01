import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ setamodalstatus, product, refetch }) => {
    const {itemName, photoUrl,resalePrice,_id } = product;
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const price = form.resaleprice.value;
        const name = form.name.value;
        const userId = form.email.value;
        const location = form.email.meedlocation;
        const phone = form.phone.value;
        setamodalstatus(null);
        const booking = {
            name,
            productId:_id,
            userId,
            phone,
            price,
            location
        }

        fetch('https://laptop-reseler-server-side-hazratali-pixel.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message === "Item booked") {
                    setamodalstatus(null);
                    toast.success('Booking confirmed');
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
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <figure>
                        <img src={photoUrl} alt="" className='rounded-lg' />
                    </figure>
                    <h3 className="text-lg font-bold p-2"><strong>Name: </strong> {itemName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-2'>
                        <input type="text" name='resaleprice'  disabled  defaultValue={resalePrice} className="input w-full input-bordered " />
                        <input name="name" type="name" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <textarea defaultValue={''} name='meedlocation' placeholder='Your address' className='border-2 p-2 rounded-lg resize-none' onResize={false} rows={3}/>
                        <input name="phone" type="text"  placeholder="Phone Number" className="input w-full input-bordered" />
                        
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;