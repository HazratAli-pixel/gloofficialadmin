import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: users, isLoading, refetch} = useQuery({
      queryKey: ['users'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/user/list/');
          const data = await res.json();
          return data.respons;
      }
  });


  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/user/${id}`, {
          method: 'DELETE',
          headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(res => res.json())
      .then(data => {
            toast.success('Delete successfull.')
            refetch();
      })
  }

  if(isLoading){
    return <Loading></Loading>
  }

    return (
        <div className='p-2'>
            <div className='flex flex-row justify-center items-center gap-4 bg-gradient-to-r rounded-lg p-2 from-red-100 via-amber-300 to-red-100'>
              <h2 className="text-3xl font-bold">All User List</h2>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    {/* <th>Photo</th> */}
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Ref ID</th>
                    <th>Balance</th>
                    <th>Win Blnce</th>
                    <th>Modify</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((person, i) =><tr key={person._id}>
                        <th>{i+1}</th>
                        <td>{person?.name}</td>
                        <td>{person?.email}</td>
                        <td>{person?.refererId}</td>
                        <td>{person?.balance}</td>
                        <td>{person?.winbalance}</td>
                        <td><label htmlFor="booking-modal"  className='btn btn-xs btn-success' onClick={() => setamodalstatus(person)}>Update</label></td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(person._id)}>Delete</button></td>
                      </tr>)
                  }
      
              </tbody>
            </table>
          </div>
            {
                modalstatus &&
                    <BookingModal
                    setamodalstatus={setamodalstatus}
                    refetch={refetch}
                    userlist={modalstatus}
                    ></BookingModal>
            
            }
    </div>
    );
};

export default AllSaler;