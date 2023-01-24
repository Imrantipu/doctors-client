import React, { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged ,signOut,updateProfile} from "firebase/auth";
import app from '../firebase/firebase.config';
import { useState, useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
       const [user ,setUser] = useState(null);
    const createUser = (email,password) =>{
   return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email,password) =>{
       return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) =>{
       return updateProfile(user,userInfo);
        
    }

    const logOut = ()=>{
    return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
          return () => unsubscribe();
    },[])

    const authInfo ={
        createUser,
        signIn,
        logOut,
        updateUser,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;