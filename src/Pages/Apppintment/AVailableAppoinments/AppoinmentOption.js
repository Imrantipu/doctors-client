import React from 'react';
import PrimaryButton from './../../../components/PrimaryButton';


const AppoinmentOption = ({appoinmentOption ,setTreatment}) => {
    const {name,slots} = appoinmentOption;

    return (
        <div className="card shadow-xl">
  <div className="card-body text-center">
    <h2 className="text-2xl font-bold text-secondary">{name}</h2>
    <p>{slots.length>0 ? slots[0] : "Try another time"}</p>
    <p>{slots.length} {slots.length>1 ? "spaces" : "space"} available</p>
    <div className="card-actions justify-center">
    <label 
    onClick={()=>setTreatment(appoinmentOption)}
    htmlFor="booking-appointment" 
    className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
    >Book Appointment</label>
    </div>
  </div>
</div>
    );
};

export default AppoinmentOption;