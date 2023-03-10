import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
// import useToken from "../hooks/useToken";
import useToken from "./../hooks/useToken";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [signUpError, SetSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(createdUserEmail);
  if (token) {
    navigate(from, { to: "/" }, { replace: true });
  }

  const handleSignUp = (data) => {
    SetSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // handleEmailVerification();
        // navigate(from, {to:"/"}, { replace: true });
        // toast.success('Please verify your email');
        toast.success("User created");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        SetSignUpError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    SetSignUpError("");
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        //  navigate(from, {to:"/"}, { replace: true });
      })
      .catch((error) => {
        SetSignUpError(error.message);
      });
  };

  // const handleEmailVerification = () =>{
  //   verifyEmail()
  //   .then(() => {});
  // }
  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("save user email", email);
        // getUserToken(email);
        setCreatedUserEmail(email);
      });
  };

  // const getUserToken = email =>{
  //   fetch(`http://localhost:5000/jwt?email=${email}`)
  //   .then(res =>res.json())
  //   .then(data =>{
  //     if(data.accessToken){
  //       localStorage.setItem('accessToken', data.accessToken);
  //       navigate('/');
  //     }
  //   })
  // }

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
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="input input-bordered dark:text-accent"
                />
                {errors.name && (
                  <p className="text-red-600">{errors.name?.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  type="email"
                  className="input input-bordered dark:text-accent"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                      message:
                        "Password must have uppercase, number and special characters",
                    },
                  })}
                  type="password"
                  className="input input-bordered dark:text-accent"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password?.message}</p>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-accent "
                  value="Sign Up"
                  type="submit"
                />
              </div>

              <div>
                {signUpError && (
                  <p className="text-red-600">Email already used.</p>
                )}
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
