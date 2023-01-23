import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {

  const [signInError, setSignInError] = useState('');
  const {signIn}= useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const handleLogin = (data) => {
    setSignInError('');
    console.log(data);
    signIn(data.email,data.password)
    .then((result) => {
     
      const user = result.user;
        console.log(user);
    })
    .catch((error) => {
      console.log(error.message);
      setSignInError(error.message);
    });
  
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="card  w-96  shadow-2xl ">
          <h1 className="text-2xl font-bold text-center mt-2">Login</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogin)}>
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
                  minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                   })}
                  type="password"
                  className="input input-bordered dark:text-accent"
                />
                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                <label className="label">
                  <span className="label-text">Forget Password?</span>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-accent "
                  value="Login"
                  type="submit"
                />
              </div>

            <div>
              {signInError && <p className="text-red-600">Your Email or Password is wrong.</p> }
            </div>
              
            </form>
            <p>
                New to dentalService?{" "}
                <Link to="/signup" className="text-secondary">
                  {" "}
                  Create a new account
                </Link>{" "}
              </p>
              <div className="divider">OR</div>
              <button className="btn btn-outline ">
                CONTINUE WITH GOOGLE
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
