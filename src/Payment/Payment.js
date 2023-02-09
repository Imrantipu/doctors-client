import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData} from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  const booking = useLoaderData();
//   when using loader in route useNavigation helps to identify loading state
// to use Loader
  // const navigation = useNavigation();
  const { treatment, price, appointmentDate, slot } = booking;
  //  if(navigation.state === "loading"){
  //       return <Loader></Loader>
  //   }
  return (
    <div>
      <h3 className="text-3xl">Payment for {treatment}</h3>
      <p className="text-xl">
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>
      <div className='w-96 my-12'>
        <Elements stripe={stripePromise}>
          <CheckoutForm
          booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
