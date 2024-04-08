//we call this file .js because we will just return value from this hook
import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {

    const [loading,setLoading] = useState(false);
    //nous avons appelé la valeur setAuth pour recupérer le user 
    const {setAuthUser} = useAuthContext()

    const signup = async({fullName,username,password,confirmPassword,gender}) => {
       const success = handleInputErrors({fullName,username,password,confirmPassword,gender})
       if(!success) return;

       setLoading(true); 
       try{
        const res = await fetch("/api/auth/signup", {
            method :'POST',
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({fullName,username,password,confirmPassword,gender})
        })

        const data = await res.json();
        if(data.error) {
            throw new Error(data.error)
        }
          //localstorage
          localStorage.setItem("auth-user",JSON.stringify(data))
          //recupération du user , maintenant on vas faire la condition dans l'app.jsx
          setAuthUser(data);

       }catch(error) {
        toast.error(error.message)
       }   finally{
        setLoading(false);
       }
    } 
    //return the functions
    return { loading, signup };
};




export default useSignUp;


function handleInputErrors({fullName,username,password,confirmPassword,gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('All the fields are required')
        return false
    }

    if(password !== confirmPassword) {
        toast.error('Password do not match')
        return false
    }

    if(password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }
    return true
}