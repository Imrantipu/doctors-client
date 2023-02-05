import { format } from "date-fns";
import { useState } from "react";
import AppoinmentOption from "./AppoinmentOption";
import BookingModal from "./../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";

const AvailableAppoinments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);

  const date = format(selectedDate, "PP");
  const {
    data: appointmentOptions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `https://doctor-server-psi.vercel.app/appointmentOptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
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
          refetch={refetch}
          selectedDat={selectedDate}
          setTreatment={setTreatment}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppoinments;
