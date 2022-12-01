import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const ReportedProducts = () => {
    const {data: reportedproducts = [], refetch} = useQuery({
        queryKey: ['reportedproducts'],
        queryFn: async() =>{
            const res = await fetch('https://laptop-reseler-server-side-hazratali-pixel.vercel.app/products/report/list');
            const data = await res.json();
            return data.respons;
        }
    });

    const handleDelete = id => {
        fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/user/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.message){
              toast.success('Delete suffcessfull.')
              refetch();
            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Photo</th>
        <th>Name</th>
        <th>Price</th>
        <th>MSG</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        reportedproducts.map((product, i) =><tr key={product._id}>
            <th>{i+1}</th>
            <td><img src={product?.photoUrl} className='max-w-20 max-h-20 rounded-full' alt="" /></td>
            <td>{product?.itemName}</td>
            <td>{product.resalePrice}</td>
            <td>{product.reportMsg}</td>
            <td><button className='btn btn-xs btn-danger' onClick={() => handleDelete(product._id)}>Delete</button></td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ReportedProducts;