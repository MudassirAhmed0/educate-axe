import React,{ useEffect, useContext,useState}  from  'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './auth'

const UserContext = React.createContext()

export const UserProvider = props=>{
    const [session,setSession] = useState({user:null,loading:true,access:null})



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            
            setSession({user,loading:false,access:'incomplete'})
        })
        return ()=> unsubscribe()
    },[])

    return (
        <UserContext.Provider value={session}>
            {!session.loading && props.children}
        </UserContext.Provider>
    )
}

export const useSession =()=>{
        const session = useContext(UserContext)
        return session
}