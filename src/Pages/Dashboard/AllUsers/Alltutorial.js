import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: tutorials, refetch, isLoading} = useQuery({
      queryKey: ['tutorials'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/basic/tutorial/list/');
          const data = await res.json();
          return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/basic/tutorial/${id}`, {
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
              <h2 className="text-3xl font-bold">All Tutorial List</h2>
              <button className="btn-secondary btn-sm btn">Add Video</button>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Video</th>
                    <th>Live</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tutorials.map((tutorial, i) =><tr key={tutorial._id}>
                        <th>{i+1}</th>
                        <td>{tutorial?.video}</td>
                        <td>{tutorial?.live}</td>
                        <td>{tutorial?.createdOn.slice(0,10)}</td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(tutorial?._id)}>Delete</button></td>
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

