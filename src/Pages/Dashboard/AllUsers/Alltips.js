import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: tips, isLoading, refetch} = useQuery({
      queryKey: ['tips'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/tips/list/');
          const data = await res.json();
          return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/tips/${id}`, {
          method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
            toast.success('Delete successfull.')
            refetch();
  
      })
  }


  if(isLoading){
    return  <Loading></Loading>
  }


    return (
        <div className='p-2'>
            <div className='flex flex-row justify-center items-center gap-4 bg-gradient-to-r rounded-lg p-2 from-red-100 via-amber-300 to-red-100'>
              <h2 className="text-3xl font-bold">All Tips List</h2>
              <button className="btn-secondary btn-sm btn">Add Tips</button>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Photo</th>
                    <th>Category</th>
                    <th>Info</th>
                    <th>Link</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tips.map((tip, i) =><tr key={tip._id}>
                        <th>{i+1}</th>
                        <td>
                        <figure>
                          <img src={tip?.uri} alt="" className='rounded-lg h-20' />
                        </figure>
                        </td>
                        <td>{tip?.category}</td>
                        <td>{tip?.description}</td>
                        <td className='text-blue-600 font-bold underline'><a href={tip?.uri}>Link</a></td>
                        <td>{tip?.createdOn.slice(0,10)}</td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(tip._id)}>Delete</button></td>
                      </tr>)
                  }
      
              </tbody>
            </table>
          </div>
    </div>
    );
};

export default AllSaler;

