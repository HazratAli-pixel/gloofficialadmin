import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: deposits, isLoading, refetch} = useQuery({
      queryKey: ['deposits'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/diposit/list/');
          const data = await res.json();
          return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/diposit/${id}`, {
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
              <h2 className="text-3xl font-bold">All Deposit List</h2>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Number</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Modify</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    deposits.map((deposit, i) =><tr key={deposit._id}>
                        <th>{i+1}</th>
                        <td>{deposit?.userId}</td>
                        <td>{deposit?.amount}</td>
                        <td>{deposit?.number}</td>
                        <td>{deposit?.paymentMethod}</td>
                        <td>{
                          deposit?.status ==="0" ?  <p className='btn btn-xs btn-warning'>Pending</p> : 
                          deposit?.status ==="1" ? <p className='btn btn-xs btn-success'>Success</p> : 
                          deposit?.status === "2" ? <p className='btn btn-xs btn-error'>Cancel</p> :""
                        }</td>
                        <td><label htmlFor="booking-modal"  className='btn btn-xs btn-success' onClick={() => setamodalstatus(deposit)}>Update</label></td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(deposit._id)}>Delete</button></td>
                      </tr>)
                  }
      
              </tbody>
            </table>
          </div>
           
    </div>
    );
};

export default AllSaler;