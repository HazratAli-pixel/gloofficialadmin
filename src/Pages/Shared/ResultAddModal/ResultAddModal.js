import React from 'react';
import toast from 'react-hot-toast';

const ResultAddModal = ({ setAddResultModal,refetch }) => {
    // const {name,_id, createdOn,email,password, refererId, winbalance,balance } = userlist;

    const handleBooking = async (event) => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const firstprice = form.firstprice.value;
        const downNumber = form.downNumber.value;
        const threeupgame = form.threeupgame.value;
        const threeupdown = form.threeupdown.value;
        const nextdraw = form.nextdraw.value;
        const nextdrawday = form.nextdrawday.value;
        setAddResultModal(null);
        const Resultinfo = {
            date,
            firstprice,
            downNumber,
            threeupgame,
            threeupdown,
            nextdraw,
            nextdrawday,
        }

        fetch(`https://glo-official-server-git-main-hazratali-pixel.vercel.app/result/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(Resultinfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAddResultModal(null);
                refetch()
                toast.success('Result Added');
             
            })


    }

    return (
        <>
            <input type="checkbox" id="result-add-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="result-add-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={()=>setAddResultModal(null)} >✕</label>
                    <h3 className="text-lg font-bold p-2"><strong>Result Info</strong></h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-2'>
                        {/* <input type="text" name='resaleprice'   defaultValue={resalePrice} className="input w-full input-bordered " /> */}
                        <div>
                            <label className="label"> <span className="label-text font-bold">Date</span></label>
                            <input name="date" type="text"  className="input w-full input-bordered" placeholder='Result Date (10 Nov, 2022)' />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">firstprice</span></label>
                            <input name="firstprice" type="text"  placeholder="First Price Number" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">downNumber</span></label>
                            <input name="downNumber" type="text"  placeholder="Down Number" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">threeupgame</span></label>
                            <input name="threeupgame" type="text"  placeholder="Three Up Digit" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">threeupdown</span></label>
                            <input name="threeupdown" type="text"  placeholder="Three up Down" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">nextdraw</span></label>
                            <input name="nextdraw" type="text"  placeholder="Next Draw day" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">nextdrawday</span></label>
                            <input name="nextdrawday" type="text"  placeholder="Next Draw Date (10 Nov, 2022)" className="input w-full input-bordered" />
                        </div>
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResultAddModal;