import React from 'react';
import useTitle from '../../../hooks/useTitle';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import Newsletter from '../NewsLetter/Newsletter';
import Products from '../Products/Products';

const Home = () => {
    useTitle('Home')
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Products></Products>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;