import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

    const {createUser,updateUser,googleSignIn ,verifyEmail} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
  const { register, formState: { errors }, handleSubmit } = useForm();

const [signUpError,SetSignUpError] = useState("");
  const handleSignUp = (data) => {
    SetSignUpError("");
    console.log(data);
    createUser(data.email,data.password)
    .then((result) => {
        const user = result.user;
        console.log(user);
        handleEmailVerification();
        navigate(from, {to:"/"}, { replace: true });
        toast.success('Please verify your email');
         const userInfo = {
          displayName: data.name
        };
        updateUser(userInfo)
        .then(() => {
         navigate("/");
        })
        .catch((error) => {});
      })
      .catch((error) => {
        SetSignUpError(error.message);
      });
  };

  const handleGoogleSignIn = () =>{
    SetSignUpError("");
     googleSignIn(googleProvider)
     .then((result) => {
       const user = result.user;
       console.log(user);
       navigate(from, {to:"/"}, { replace: true });
     })
     .catch((error) => {
      SetSignUpError(error.message);
     });

}

const handleEmailVerification = () =>{
  verifyEmail()
  .then(() => {});

}

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="card  w-96  shadow-2xl ">
          <h1 className="text-2xl font-bold text-center mt-2">Sign Up</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Name</span>
                </label>
                <input
                  {...register("name", 
                  { required: "Name is required" }
                  )}
                  type="text"
                  className="input input-bordered dark:text-accent"
                />
                 {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  {...register("email", 
                  { required: "Email Address is required" }
                  )}
                  type="email"
                  className="input input-bordered dark:text-accent"
                />
                 {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password",
                  { required: "Password is required",
                  minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                  pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                   })}
                  type="password"
                  className="input input-bordered dark:text-accent"
                />
                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-accent "
                  value="Sign Up"
                  type="submit"
                />
              </div>

              <div>
              { signUpError && <p className="text-red-600">Email already used.</p>}
              </div>
              
            </form>
            <p>
                Already have an account{" "}
                <Link to="/login" className="text-secondary">
                  {" "}
                  Please Login
                </Link>{" "}
              </p>
              <div className="divider">OR</div>
              <button onClick={handleGoogleSignIn} className="btn btn-outline ">
                CONTINUE WITH GOOGLE
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
