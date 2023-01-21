import React from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import { useState } from 'react';
import AvailableAppoinments from '../AVailableAppoinments/AvailableAppoinments';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            ></AppointmentBanner>

            <AvailableAppoinments selectedDate={selectedDate}></AvailableAppoinments>
        </div>
    );
};

export default Appointment;