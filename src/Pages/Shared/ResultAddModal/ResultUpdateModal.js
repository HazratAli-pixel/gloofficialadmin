import React from 'react';
import toast from 'react-hot-toast';

const ResultUpdateModal = ({ modalstatus, setamodalstatus, refetch  }) => {
    const {date,firstprice, downNumber, threeupgame,threeupdown,nextdrawday, _id } = modalstatus;

    const handleResultUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const firstprice = form.firstprice.value;
        const downNumber = form.downNumber.value;
        const threeupgame = form.threeupgame.value;
        const threeupdown = form.threeupdown.value;
        const nextdraw = form.nextdraw.value;
        const nextdrawday = form.nextdrawday.value;
        const updateResultinfo = {
            date,
            firstprice,
            downNumber,
            threeupgame,
            threeupdown,
            nextdraw,
            nextdrawday,
        }

        fetch(`https://glo-official-server-git-main-hazratali-pixel.vercel.app/result/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateResultinfo)
        })
            .then(res => res.json())
            .then(data => {
                setamodalstatus(null);
                refetch()
                toast.success('Result Added');
        })


    }

    return (
        <>
            <input type="checkbox" id="result-update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="result-update-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={()=>setamodalstatus(null)} >✕</label>
                    <h3 className="text-lg font-bold p-2"><strong>Update Result Info</strong></h3>
                    <form onSubmit={handleResultUpdate} className='grid grid-cols-1 gap-3 mt-2'>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Date</span></label>
                            <input name="date" type="text" defaultValue={date} className="input w-full input-bordered" placeholder='Result Date (10 Nov, 2022)' />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">First Price</span></label>
                            <input name="firstprice" type="text"  defaultValue={firstprice} placeholder="First Price Number" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Down Number</span></label>
                            <input name="downNumber" type="text" defaultValue={downNumber}  placeholder="Down Number" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Three up game</span></label>
                            <input name="threeupgame" type="text"  defaultValue={threeupgame} placeholder="Three Up Digit" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Three up down</span></label>
                            <input name="threeupdown" type="text" defaultValue={threeupdown} placeholder="Three up Down" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Next Draw day</span></label>
                            <input name="nextdraw" type="text" required placeholder="Next Draw date" className="input w-full input-bordered" />
                        </div>
                        <div>
                            <label className="label"> <span className="label-text font-bold">Next draw date</span></label>
                            <input name="nextdrawday" type="text" defaultValue={nextdrawday} placeholder="Next Draw Date (10 Nov, 2022)" className="input w-full input-bordered" />
                        </div>
                        <input className='btn btn-accent w-full' type="submit" value="update" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResultUpdateModal;