import React from 'react';
import toast from 'react-hot-toast';


const Newsletter = () => {
    
    const handleBooking = (event)=>{
        event.preventDefault();
        const form = event.target;
        let email = form.email.value;
        toast.success('Subscription successful')
        event.target.email.value= ''
        console.log(email);
    }

    return (
        <section className='my-16 bg-red-200 py-16'>
            <div className='flex flex-col justify-center'>
                <div className='text-center'>
                    <h3 className='text-4xl font-bold text-primary uppercase'>Subscribe</h3>
                    <h2 className='p-2 text-xl'>Subscribe our Newsletter to stay updated in every moment</h2>
                </div>
                <div className='pt-7 px-3'>
                    <form action="" method='post' onSubmit={handleBooking}>
                        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row gap-3 justify-center items-center'>
                            <input name='email' type="email" placeholder="Enter a valid email address" className="input input-bordered input-accent w-full max-w-xs" required/>
                            <button className="btn btn-primary m-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
               
            </div>
        </section>
    );
};

export default Newsletter;