import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from 'react';
import InfoCard from './InfoCard';



const InfoCards = () => {

    const {data: cardData =[]} = useQuery({
        queryKey:["cardData"],
        queryFn: async ()=>{
            const resdata = await axios(`https://laptop-reseler-server-side-hazratali-pixel.vercel.app/category/list`)
            return resdata.data.respons
        }
    })

    return (
        <div className='shadow-lg px-3 pt-14 pb-3 rounded-lg'>
            <div className=''>
                <p className='text-3xl font-bold'>Laptop Brands Category</p>
            </div>
            <div className='grid mt-8 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 '>
            {
                cardData.map(card => <InfoCard
                    key={card._id}
                    card={card}
                ></InfoCard>)
            }
            </div>
        </div>
    );
};

export default InfoCards;