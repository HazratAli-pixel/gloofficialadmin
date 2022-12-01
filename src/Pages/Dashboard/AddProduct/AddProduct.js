import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user} = useContext(AuthContext)
    const imageHostKey = process.env.REACT_APP_IMGBB_KEY;

    const navigate = useNavigate();
    
    const {data: cardData =[], isLoading} = useQuery({
        queryKey:["cardData"],
        queryFn: async ()=>{
            const resdata = await axios(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/category/list`)
            return resdata.data.respons
        }
    })


    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                // name, description, sallingprice, originalprice, location, usetime, brand, ,image, negotiaton, phone
                const productinfo = {
                    brand: data.brand, 
                    itemName: data.name, 
                    description: data.description, 
                    originalPrice: data.originalprice, 
                    resalePrice: data.sallingprice, 
                    condition: data.condition, 
                    photoUrl: imgData.data.url, 
                    phone: data.phone, 
                    location: data.location,
                    usedtime: data.usetime,
                    userid: user?.email,
                    nagotiationFlag: data.negotiaton
                }

                // save product information to the database
                fetch('https://laptop-reseler-server-side-hazratali-pixel.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(productinfo)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`Product added successfully`);
                    navigate('/dashboard/myproducts')
                })
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add Product</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Products Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" placeholder='Product name'/>
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Description</span></label>
                        <textarea type="text" {...register("description", {
                            required: "Description is Required"
                        })} placeholder='Enter Product description' className='border-2 p-2 rounded-lg resize-none' 
                        onResize={false} rows={3}/>
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Saling Price</span></label>
                        <input type="text" {...register("sallingprice", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" placeholder='Enter Salling Price' />
                        {errors.sallingprice && <p className='text-red-500'>{errors.sallingprice.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Original Prie</span></label>
                        <input type="text" {...register("originalprice", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" placeholder='Enter Original Price' />
                        {errors.originalprice && <p className='text-red-500'>{errors.originalprice.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold">Location</span></label>
                        <input type="text" {...register("location", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" placeholder='Enter locaiton (Dhaka)' />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
           
               <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text font-bold">Location</span></label>
                    <input type="text" {...register("phone", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" placeholder='Enter phone number' />
                    {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text font-bold">Use of Months</span></label>
                    <input type="text" {...register("usetime", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" placeholder='Enter use of monthe' />
                    {errors.usetime && <p className='text-red-500'>{errors.usetime.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text font-bold">Brand</span></label>
                    <select 
                    {...register('brand')}
                    className="select input-bordered w-full max-w-xs">
                    <option disabled selected>Select Brand</option>
                        {
                            cardData.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text font-bold">Condition</span></label>
                    <select 
                    {...register('condition')}
                    className="select input-bordered w-full max-w-xs">
                        <option disabled selected>Select condition</option>
                        <option value="Excellnet">Excellnet</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text font-bold">Negotiation</span></label>
                    <select 
                    {...register('negotiaton')}
                    className="select input-bordered w-full max-w-xs">
                        <option disabled selected>Can Negotiation?</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="form-control ">
                    <label className="label"> <span className="label-text font-bold">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required",
                    })} className="file file-input file-input-bordered w-full" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                
                <input className='btn btn-accent w-full mt-4' value="Add Product" type="submit" />
            </form>
        </div>
    );
};



export default AddProduct;