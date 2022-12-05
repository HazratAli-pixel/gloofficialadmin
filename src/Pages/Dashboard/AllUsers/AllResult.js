import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import ResultAddModal from '../../Shared/ResultAddModal/ResultAddModal';
import ResultUpdateModal from '../../Shared/ResultAddModal/ResultUpdateModal';

const AllSaler = () => {
  const [modalstatus, setamodalstatus] = useState(null)
  const [AddResultModal, setAddResultModal] = useState(null)
  const {data: results, isLoading, refetch} = useQuery({
      queryKey: ['results'],
      queryFn: async() =>{
        const res = await fetch('https://glo-official-server.vercel.app/result/list/');
        const data = await res.json();
        return data.respons;
      }
  });

  const handleDelete = id => {
      fetch(`https://glo-official-server.vercel.app/result/${id}`, {
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
              <h2 className="text-3xl font-bold">All Result List</h2>
              <label className="btn-secondary btn-sm btn" htmlFor="result-add-modal" onClick={()=> setAddResultModal('Result')} >Add Result</label>
            </div>
            <div className="overflow-x-auto py-2">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>1st Price</th>
                    <th>Down</th>
                    <th>3UP</th>
                    <th>3up Down</th>
                    <th>Status</th>
                    <th>Modify</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.map((result, i) =><tr key={result._id}>
                        <th>{i+1}</th>
                        <td>{result?.date.slice(0,10)}</td>
                        <td>{result?.firstprice}</td>
                        <td>{result?.downNumber}</td>
                        <td>{result?.threeupgame}</td>
                        <td>{result?.threeupdown}</td>
                        <td>{
                          result?.status ==="0" ?  <p className='btn btn-xs btn-success'>Published</p> : 
                          result?.status ==="1" ? <p className='btn btn-xs btn-success'>Next</p> : ""
                        }</td>
                        <td><label htmlFor="result-update-modal"  className='btn btn-xs btn-info' onClick={() => setamodalstatus(result)}>Update</label></td>
                        <td><button className='btn btn-xs btn-error' onClick={() => handleDelete(result._id)}>Delete</button></td>
                      </tr>)
                  }
      
              </tbody>
            </table>
          </div>
            {
              AddResultModal &&
                <ResultAddModal
                AddResultModal = {AddResultModal} 
                setAddResultModal = {setAddResultModal}
                refetch = {refetch}
                ></ResultAddModal>
            
            }
            {
              modalstatus &&
                <ResultUpdateModal
                modalstatus = {modalstatus} 
                setamodalstatus = {setamodalstatus}
                refetch = {refetch}
                ></ResultUpdateModal>
            
            }
    </div>
    );
};

export default AllSaler;