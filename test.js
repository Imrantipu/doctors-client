import React, { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , signInWithPopup, onAuthStateChanged ,signOut,updateProfile, sendEmailVerification} from "firebase/auth";
import app from '../firebase/firebase.config';
import { useState, useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
       const [user ,setUser] = useState(null);
       const [loading ,setLoading]= useState(true);
    const createUser = (email,password) =>{
      setLoading(true);
   return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email,password) =>{
      setLoading(true);
       return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) =>{
       return updateProfile(auth.currentUser,userInfo);
        
    }

    const googleSignIn = (provider) =>{
      setLoading(true);
      return signInWithPopup(auth, provider);

    }

    const verifyEmail =() =>{
       return sendEmailVerification(auth.currentUser);
    }

    const logOut = ()=>{
      setLoading(true);
    return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
           if(currentUser === null || currentUser.emailVerified){
            setUser(currentUser);
           }
            setLoading(false);
          });
          return () => unsubscribe();
    },[])

    const authInfo ={
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUser,
        verifyEmail,
        loading,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;




const getUserToken = email =>{
  fetch(`http://localhost:5000/jwt?email=${email}`)
  .then(res =>res.json())
  .then(data =>{
    if(data.accessToken){
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/');
    }
  })
}
