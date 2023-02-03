import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from '../../../components/Loader/Loader';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const { data: doctors, isLoading} = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="rounded-md ">
        <div className="p-12">
          <h3 className="text-3xl pb-5">Manage Doctors: {doctors?.length}</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="dark:text-black">
                  <th></th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  doctors?.map((doctor,i) =><tr className="hover dark:text-black"
                  key={i}
                  >
                      <th>{i+1}</th>
                      <td>
                      <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div>
                      </td>
                      <td>{doctor.name}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.specialty}</td>
                      <td>
                      <label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-xs  btn-error">Delete</label>
                        </td>
                    </tr>)
                }
  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default ManageDoctors;