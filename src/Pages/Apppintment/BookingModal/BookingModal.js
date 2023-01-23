import React from "react";
import { format } from "date-fns";

const BookingModal = ({ treatment, selectedDat }) => {
  const date = format(selectedDat, "PP");
  const { name: treatmentName ,slots} = treatment;

  const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const booking ={
           appointmentDate: date,
           treatment: treatmentName,
           patientName:name,
           slot,
           phone,
           email      
        }
        console.log(booking);
  }
  return (
    <div>
      <input
        type="checkbox"
        id="booking-appointment"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-appointment"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold dark:text-accent">{treatmentName}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              disabled
              value={date}
              className="input input-bordered w-full dark:text-accent disabled:text-accent"
            />
            <select name ="slot" className="select select-bordered w-full dark:text-accent">
            {
              slots.map((slot,i) =>  <option
              value ={slot}
              key ={i}
              >{slot}</option> )
            }
             
            </select>

            <input
              type="text"
              name ="name"
              placeholder="Full Name"
              className="input input-bordered w-full dark:text-accent "
            />
            <input
              type="text"
              name ="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full dark:text-accent "
            />
            <input
              type="email"
              name ="email"
              placeholder="Email"
              className="input input-bordered w-full dark:text-accent "
            />
            <input className="btn btn-accent w-full" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
