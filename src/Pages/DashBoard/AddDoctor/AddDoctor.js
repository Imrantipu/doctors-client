import React from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../../components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const AddDoctor = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        
    }

    if(isLoading){
        return <Loader></Loader>
    }

    return (
        <div className='w-96 p-7'>
        <h2 className="text-4xl">Add A Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text dark:text-white">Name</span></label>
                <input type="text" {...register("name", {
                    required: "Name is Required"
                })} className="input input-bordered w-full max-w-xs dark:text-black" />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text dark:text-white">Email</span></label>
                <input type="email" {...register("email", {
                    required: true
                })} className="input input-bordered w-full max-w-xs dark:text-black" />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text dark:text-white">Specialty</span></label>
                <select {...register('specialty')} className="select input-bordered w-full max-w-xs dark:text-black ">
                        {
                            specialties.map(specialty => <option 
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }   
                    </select>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text dark:text-white">Photo</span></label>
                <input type="file" {...register("img", {
                    required: "Photo is Required"
                })} className="input input-bordered w-full max-w-xs dark:text-black" />
                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
            </div>
            
            <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
        </form>
    </div>
    );
};

export default AddDoctor;