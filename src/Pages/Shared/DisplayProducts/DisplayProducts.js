import React, { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import BookingModal from '../BookingModal/BookingModal';
import ReportModal from '../ReportModal/ReportModal';
import DisplayProduct from './DisplayProduct';


const DisplayProducts = () => {
    const id = useParams()
    console.log(id)
    useTitle('Product list')
    const {respons} = useLoaderData()
    const {user} = useContext(AuthContext)
    const [modalstatus, setamodalstatus] = useState(null)
    const [reportmodal, setreportamodal] = useState(null)
    const productsList = respons



    return (
        <div className='shadow-lg px-3 pt-14 pb-3 rounded-lg'>        
            <div className=''>
            {
                productsList.length===0? 
                <p className='text-3xl font-bold'><strong>Brand ({id.category}) : </strong> <span className='text-red-400'>No Data found...!!</span></p>: <p className='text-3xl underline font-bold'> <strong>Brand : </strong> {id.category} </p>
            }
            </div>
            <div className='grid mt-8 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            {
                productsList.map(product => <DisplayProduct 
                    key={product.id}
                    product={product}
                    setamodalstatus={setamodalstatus}
                    setreportamodal={setreportamodal}
                ></DisplayProduct>
                )
            }
            </div>
            {
                modalstatus && user &&
                    <BookingModal
                    setamodalstatus={setamodalstatus}
                    refetch={''}
                    product={modalstatus}
                    ></BookingModal>
            
            }
            {
                reportmodal && user &&
                    <ReportModal
                    setreportamodal={setreportamodal}
                    refetch={''}
                    reportmodal={reportmodal}
                    ></ReportModal>
            }
        </div>
    );
};

export default DisplayProducts;