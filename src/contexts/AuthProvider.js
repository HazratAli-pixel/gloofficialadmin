import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
;


export const AuthContext = createContext();
const auth = getAuth(app)
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modeToogle, setModeToogle] = useState(true);
    const [theme, setTheme] = useState("dark");

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signinWithGoogle = () => {
        setLoading(true);
        return signInWithPopup (auth, googleprovider)
    }
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    const deleteuserss = (uid) =>{
        setLoading(true);
        return auth.deleteUser(uid);
    }
    const modechange = () =>{
        if(!modeToogle){
          setTheme('dark');
          setModeToogle(true)
          document.body.setAttribute("data-theme", theme);
        }
        else{
          setModeToogle(false)
          setTheme('light');
          document.body.setAttribute("data-theme", theme);
        }
        console.log(theme);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser,
        signIn,
        setUser,
        updateUser,
        logOut,
        user,
        loading,
        setLoading,
        modechange, 
        modeToogle,
        signinWithGoogle,
        deleteuserss,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;