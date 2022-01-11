import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import {useHistory} from 'react-router-dom'
import './Login.css'
function Login() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const {login,currentUser,signup} = useContext(AuthContext);
    const history = useHistory();
    const handleLogin = async(e)=>{
     e.preventDefault();
     try{
         console.log('login user')
        setLoading(true);
         await login(email,password);       
        setLoading(false);
        history.push('/Movies');
     }catch{
     setError("failed to login");
     setTimeout(()=>setError(' '),2000);
     setLoading(false);
     }
    }
    useEffect(() => {
       if(currentUser){
           history.push('/Movies');
       }
    }, [])
    const Signup =()=>{
        history.push('/');
    }
    return (
        <>
        <h1 className = 'movies'>MoviesApp</h1>
        <div className = 'logincss'>
            <form onSubmit = {handleLogin}>
               
                <div>
                    {/* <label htmlFor = ''>Email</label> */}
                    <input className = 'formcontent' placeholder = 'email' type = 'mail' value = {email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div >
                    {/* <label htmlFor = ''>Password</label> */}
                    <input className = 'formcontent' placeholder = 'Password' type = 'new-password' value = {password} onChange ={(e)=> setPassword(e.target.value)}/>
                </div>
                <button className = 'loginSubmit' disabled = {loading}>Login</button>
                <p>If AnyOne want to Signup</p>
                <button className = 'stylebtn' onClick={Signup}>Signup</button>
                {!currentUser?<>{error}</>:<></>}
            </form>
        </div>
        </>
    )
}

export default Login
