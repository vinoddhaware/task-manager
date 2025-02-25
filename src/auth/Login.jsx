import React from 'react'
import { BiTask } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../firebaseConfig'
import { useUserLoginContext } from '../contextAPI/userLoginContext'

const Login = () => {

    const {setUser} = useUserLoginContext()
    const navigate = useNavigate()

    //google login
    const handleGoogleSignIn = async() =>{
        try {
            const loginDetails = await signInWithGoogle()
            setUser(loginDetails.user)
            navigate('/task-manager/home')

        } catch (error) {
            console.log(error.message || 'Something went wrong');
            
        }

    }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-start w-[60%] sm:w-[40%] lg:w-[26%] space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="text-2xl text-[#7b1984]">
            <BiTask />
          </span>
          <h1 className="text-2xl font-semibold text-[#7b1984]"> TaskBuddy </h1>
        </div>
        <p className="text-sm">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app
        </p>
        <button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-2 py-2 bg-black rounded-xl w-full">
          <img
            src="./images/google-icon.svg"
           alt="google-image"
           className="w-5"
          />
          <p className="text-white text-sm md:text-base"> Continue with Google </p>
        </button>
      </div>
    </div>
  )
}

export default Login
