import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: phonewithdraw, isLoading, refetch} = useQuery({
      queryKey: ['phonewithdraw'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/pwithdraw/list/');
          const data = await res.json();
          return data.respons;
      }
  });
  const {data: bankwithdraw=[]} = useQuery({
      queryKey: ['bankwithdraw'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/bwithdraw/list/');
          const data = await res.json();
          return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/pwithdraw/${id}`, {
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
              <h2 className="text-3xl font-bold">All Phone Withdraw List</h2>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Number</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Modify</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    phonewithdraw.map((withdraw, i) =><tr key={withdraw._id}>
                        <th>{i+1}</th>
                        <td>{withdraw?.userId}</td>
                        <td>{withdraw?.name}</td>
                        <td>{withdraw?.amount}</td>
                        <td>{withdraw?.number}</td>
                        <td>{withdraw?.paymentMethod}</td>
                        <td>{
                          withdraw?.status ==="0" ?  <p className='btn btn-xs btn-warning'>Pending</p> : 
                          withdraw?.status ==="1" ? <p className='btn btn-xs btn-success'>Success</p> : 
                          withdraw?.status === "2" ? <p className='btn btn-xs btn-error'>Cancel</p> :""
                        }</td>
                        <td><label htmlFor="booking-modal"  className='btn btn-xs btn-success' onClick={() => setamodalstatus(withdraw)}>Update</label></td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(withdraw._id)}>Delete</button></td>
                      </tr>)
                  }
              </tbody>
            </table>
            <br />
            <div className='flex flex-row justify-center items-center gap-4 bg-gradient-to-r rounded-lg p-2 from-red-100 via-amber-300 to-red-100'>
              <h2 className="text-3xl font-bold">All Bank Withdraw List</h2>
            </div>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Bank Ac</th>
                    <th>Bank Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Modify</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bankwithdraw.map((withdraw, i) =><tr key={withdraw._id}>
                        <th>{i+1}</th>
                        <td>{withdraw?.userId}</td>
                        <td>{withdraw?.Name}</td>
                        <td>{withdraw?.BankAc}</td>
                        <td>{withdraw?.BankName}</td>
                        <td>{withdraw?.amount}</td>
                        <td>{withdraw?.createdOn.slice(0,10)}</td>
                        <td>{
                          withdraw?.status ==="0" ?  <p className='btn btn-xs btn-warning'>Pending</p> : 
                          withdraw?.status ==="1" ? <p className='btn btn-xs btn-success'>Success</p> : 
                          withdraw?.status === "2" ? <p className='btn btn-xs btn-error'>Cancel</p> :""
                        }</td>
                        <td><label htmlFor="booking-modal"  className='btn btn-xs btn-success' onClick={() => setamodalstatus(withdraw)}>Update</label></td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(withdraw._id)}>Delete</button></td>
                      </tr>)
                  }
              </tbody>
            </table>
          </div>
    </div>
    );
};

export default AllSaler;