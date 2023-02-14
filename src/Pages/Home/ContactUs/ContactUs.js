import React from "react";
import { useForm } from 'react-hook-form';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from "../../../components/PrimaryButton";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../../../contexts/AuthProvider";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
const ContactUs = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleContactForm = (data) => {
      if(data.email !== user?.email){
        navigate("/login");
        return;
      }else {
        const  contact = {
          clientEmail: data.email,
          clientMessage: data.massage,
          clientSubject: data.subject
          };
    
          fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(contact),
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  toast.success("Message send successfully");
                  reset();
                });
      }
      
    }

  return (
    <div
      className="hero rounded-lg"
      style={{backgroundImage:`url(${appointment})`}}
    >
      
      <div className="hero-content text-neutral-content">
        <div className="">
          <h1 className="mb-2 text-lg text-primary font-bold text-center">Contact Us</h1>
          <p className="mb-9 text-3xl text-center">
            Stay connected with us
          </p>
          <form onSubmit={handleSubmit(handleContactForm)}>
                        <div className="form-control w-full max-w-xs mb-5">
                            <input type="email" {...register("email", {
                                required: "Email is required"
                            })} className="input input-bordered w-full max-w-xs text-black" defaultValue={user?.email} placeholder="Your Email" />
                            {errors.email && <p className='text-error'>{errors.email.message}</p>}
                        </div>
                    <div className="form-control w-full max-w-xs mb-5">
                        <input type="text" {...register("subject", {
                            required: "Subject is Required"
                        })} className="input input-bordered w-full max-w-xs text-black" placeholder="Your Subject" />
                        {errors.subject && <p className='text-error'>{errors.subject.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <textarea {...register("massage",{
                         required: "Message is Required"
                    })} className="textarea textarea-bordered text-black" placeholder="Your Message"></textarea>
                    {errors.massage && <p className='text-error'>{errors.massage.message}</p>}
                    </div>
                    <div className="mt-9 w-32 mx-auto"><PrimaryButton>Submit</PrimaryButton></div>
                </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
