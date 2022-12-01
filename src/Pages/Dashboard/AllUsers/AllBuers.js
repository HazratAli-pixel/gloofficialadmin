import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const AllBuers = () => {
  const {deleteuserss, user} = useContext(AuthContext)
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() =>{
            const res = await fetch('https://laptop-reseler-server-side-hazratali-pixel.vercel.app/user/Buyer/');
            const data = await res.json();
            return data.respons;
        }
    });

    const handleMakeAdmin = id => {
        fetch(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/user/admins/${id}`, {
            method: 'PUT', 
            headers: {
              'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({userType: "Admin"})
        })
        .then(res => res.json())
        .then(data => {
            if(data.respons){
                toast.success('Make admin successful.')
                refetch();
            }
        })
    }
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
              deleteuserss(user?.uid)
              .then(()=>{console.log('Successfully deleted user')})
              .catch((error) => {
                console.log('Error deleting user:', error);
              });
              refetch();
            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl">All Buyer list</h2>
            <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Photo</th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, i) =><tr key={user._id}>
            <th>{i+1}</th>
            <td><img src={user?.photoUrl} className='max-w-20 max-h-20 rounded-full' alt="" /></td>
            <td>{user?.displayName}</td>
            <td>{user.email}</td>
            <td>{ user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
            <td><button className='btn btn-xs btn-danger' onClick={() => handleDelete(user._id)}>Delete</button></td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllBuers;