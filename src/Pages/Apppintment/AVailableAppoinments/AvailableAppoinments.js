import { format } from "date-fns";
import { useState } from "react";
import AppoinmentOption from "./AppoinmentOption";
import BookingModal from "./../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";

const AvailableAppoinments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate,'PP');
  const {data :appointmentOptions =[] } = useQuery({
    queryKey: ['appointmentOptions',date],
    queryFn: async () => {
     const res= await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data
    }
  })
  return (
    <section className="mt-10">
      <p className="text-center text-secondary font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <p className="text-center ">Please select a service</p>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {appointmentOptions.map((option) => (
          <AppoinmentOption
            key={option._id}
            appoinmentOption={option}
            setTreatment={setTreatment}
          ></AppoinmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDat={selectedDate}
          setTreatment={setTreatment}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppoinments;
