//to log our user to the home page
import { useContext } from "react";
import { createContext, useState } from "react";

//AuthContext dans ce cas agis comme un conteneur global de données que les composants peuvent lire 
//il est crée par createContext , dans ce cas react nous fournis la possibilité d'utiliser provider and usecontext
export const AuthContext = createContext();

//this hook use usecontext to return the authcontext it will give the componentns the possibility to read values 
//from authContext without use the props
export const useAuthContext =() => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    //JSON.PARSE to take the string value and convert it to an object
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || null)

    //Our entire application will be able to use this values
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}