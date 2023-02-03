import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    console.log("booking data",booking);
    return (
        <div>
            <p>this is payment route</p>
        </div>
    );
};

export default Payment;