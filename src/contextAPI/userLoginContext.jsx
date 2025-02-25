import { createContext, useContext, useState } from "react";

const UserLoginContext = createContext()

export const UserLoginProvider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [session, setSession] = useState({})   

    return <UserLoginContext.Provider value={{user, setUser, session, setSession}} > {children} </UserLoginContext.Provider>
}

//custom hook
export const useUserLoginContext = () => useContext(UserLoginContext)
