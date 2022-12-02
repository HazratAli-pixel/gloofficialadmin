import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const {data: games, isLoading, refetch} = useQuery({
      queryKey: ['games'],
      queryFn: async() =>{
          const res = await fetch('https://glo-official-server.vercel.app/game/list/');
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
          if(data.message){
            toast.success('Delete suffcessfull.')
            refetch();
          }
      })
  }
  if(isLoading){
    return <Loading></Loading>
  }

    return (
        <div className='p-2'>
            <div className='flex flex-row justify-center items-center gap-4 bg-gradient-to-r rounded-lg p-2 from-red-100 via-amber-300 to-red-100'>
              <h2 className="text-3xl font-bold">All Ticket List</h2>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Number</th>
                    <th>Straight</th>
                    <th>Rumble</th>
                    <th>Total-Tk</th>
                    <th>Discount-Tk</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    games.map((game, i) =><tr key={game._id}>
                        <th>{i+1}</th>
                        <td>{game?.userId}</td>
                        <td>{game?.category}</td>
                        <td>{game?.number}</td>
                        <td>{game?.straight}</td>
                        <td>{game?.Rumble}</td>
                        <td>{game?.totalAmount}</td>
                        <td>{game?.discount}</td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(game._id)}>Delete</button></td>
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