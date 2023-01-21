import { format } from 'date-fns';
import { useState } from 'react';
import { useEffect } from 'react';
import AppoinmentOption from './AppoinmentOption';
import BookingModal from './../BookingModal/BookingModal';





const AvailableAppoinments = ({ selectedDate }) => {
         
    const [appointmentOptions, setAppointmentOptions] = useState([]);
     const [treatment, setTreatment] = useState(null);

        useEffect( () =>{
            fetch('appointmentOptions.json')
            .then(res=>res.json())
            .then(data=>setAppointmentOptions(data))
        },[]);
    return (
        <section className='mt-10'>
          <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
          <p className='text-center '>Please select a service</p>
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
             {
                appointmentOptions.map(option => <AppoinmentOption
                key ={option._id}
                appoinmentOption={option}
                setTreatment ={setTreatment}
                ></AppoinmentOption>)
             }
          </div>
           { treatment &&
            <BookingModal
            treatment ={treatment}
            ></BookingModal>
           }
            

        </section>
    );
};

export default AvailableAppoinments;