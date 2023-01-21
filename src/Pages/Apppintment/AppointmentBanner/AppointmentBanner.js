import React from "react";
import chair from '../../../assets/images/chair.png';
import bgchair from "../../../assets/images/bg.png"
// import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
  return (
    <header>
      <div className="hero rounded-xl" style={{backgroundImage: `url(${bgchair})`}}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className="rounded-lg  shadow-2xl sm:w-full md:w-1/2 md:ml-32" alt=""
          />
          <div className="lg:ml-64">
          <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
     
    />

          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
