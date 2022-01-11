import React, {useState,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();
function AuthProvider({children}){
   
    const[currentUser,setCurrentUser] = useState();
    const[loading,setLoading] = useState(true);
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut();
    }
    useEffect(()=>{
        const unsubcribe = auth.onAuthStateChanged((user)=>{
            console.log("Helooo",user)
            setCurrentUser(user);
            setLoading(false);
        })
        return () =>{
            unsubcribe();
        }
    },[])
    const value  ={
        currentUser,
        login,
        signup,
        logout
    }
    return( 
        <div>
          <AuthContext.Provider value ={value}>
                 {!loading&&children}
          </AuthContext.Provider>
        </div>
    )
}
export default AuthProvider  