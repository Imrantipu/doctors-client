import React, { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , signInWithPopup, onAuthStateChanged ,signOut,updateProfile} from "firebase/auth";
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
       return updateProfile(user,userInfo);
        
    }

    const googleSignIn = (provider) =>{
      setLoading(true);
      return signInWithPopup(auth, provider);

    }

    const logOut = ()=>{
      setLoading(true);
    return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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