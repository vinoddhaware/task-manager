import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { useUserLoginContext } from '../contextAPI/userLoginContext'

const AuthLayout = () => {

    const {setUser, setSession} = useUserLoginContext()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscibe = auth.onAuthStateChanged((user) =>{
            if(user){
                navigate('/task-manager/home')
                setSession({
                    name: user.displayName,
                    pic: user.photoURL
                })
            }else{
                setUser(null)
                setSession({})
                navigate('/task-manager/')
            }
        })

        return () => unsubscibe()
    }, [auth])

  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthLayout
