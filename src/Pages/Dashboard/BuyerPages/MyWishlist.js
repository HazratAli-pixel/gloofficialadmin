import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyWishlist = () => {
  const {user} = useContext(AuthContext)
  const {data: products = [], refetch} = useQuery({
      queryKey: ['products'],
      queryFn: async() =>{
          const res = await fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/wishlist/user/${user?.email}`);
          const data = await res.json();
          return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/booking/${id}`, {
          method: 'DELETE',
          headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          if(data.message){
            toast.success('Delete successfull.')
            refetch();
          }
      })
  }

    return (
        <div>
            <h2 className="text-3xl">My Wishlist</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Photo</th>
        <th>Name</th>
        <th>Price</th>
        <th>Status</th>
        <th>Advertise</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        products.map((product, i) =><tr key={product._id}>
            <th>{i+1}</th>
            <td><img src={product?.photoUrl} className='max-w-20 max-h-20 rounded-full' alt="" /></td>
            <td>{product?.itemName}</td>
            <td>{product?.resalePrice}</td>
            {
              product?.soldFlag===true? <td> <label className='btn btn-sm btn-success'>Sold</label></td> :
              <td><label className='btn btn-sm btn-error'>Unsold</label></td>
            }            
            {
              product?.soldFlag === true? <td><label className='btn btn-sm btn-success'>Allready Sold</label></td> :
              <td><Link to={`/dashboard/payment/${product._id}`} className='btn btn-sm btn-warning'>Pay now</Link></td>
            }
            <td><button className='btn btn-sm btn-danger' onClick={() => handleDelete(product._id)}>Delete</button></td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyWishlist;