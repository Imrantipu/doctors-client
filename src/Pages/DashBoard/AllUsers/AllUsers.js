import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctor-server-psi.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`https://doctor-server-psi.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Admin successfully made.");
          refetch();
        }
      });
  };
  return (
    <div className="rounded-md ">
      <div className="p-12">
        <h3 className="text-4xl pb-5">All Users : {users?.length}</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="dark:text-black">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr className="hover dark:text-black" key={i}>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-xs  btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
