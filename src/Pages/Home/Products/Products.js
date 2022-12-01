import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import ReportModal from '../../Shared/ReportModal/ReportModal';
import Service from './Product';

const Products = () => {
    const { user } = useContext(AuthContext);
    const [modalstatus, setamodalstatus] = useState(null)
    const [reportmodal, setreportamodal] = useState(null)

    const {data: servicesData =[]} = useQuery({
        queryKey:["servicesData"],
        queryFn: async ()=>{
            const resdata = await axios(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/products/advertise/list`)
            return resdata.data.respons
        }
    })



    return (
        <>
            {
                servicesData.length===0? "" : <div className='mt-16 '>
            <div className='text-center'>
                <h3 className='text-3xl font-bold text-primary uppercase'>Advertise Products</h3>
                <h2 className='p-2 text-xl'>See here latest unsold products</h2>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    servicesData.map(service => <Service
                        key={service._id}
                        service={service}
                        setamodalstatus={setamodalstatus}
                        setreportamodal={setreportamodal}
                    ></Service>)
                }
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
        </div>
            }
        </>
    );
};

export default Products;