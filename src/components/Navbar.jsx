import React from 'react'
import { BiTask, BiLogOut } from "react-icons/bi";
import { TfiViewList } from "react-icons/tfi";
import { CiViewBoard } from "react-icons/ci";
import { useTaskContext } from '../contextAPI/taskListContext';
import { useNavigate } from 'react-router-dom';
import { useUserLoginContext } from '../contextAPI/userLoginContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


const Navbar = () => {

    const {session, setSession, setUser} = useUserLoginContext()
    const navigate = useNavigate()

    const {view, setView} = useTaskContext()

    // google Logout
    const handleLogout = async() =>{
        await signOut(auth);
        setUser(null)
        setSession({})
        navigate('/task-manager/')
        }
      

  return (
    <div className='sm:w-[90%] mx-auto flex justify-between items-center sm:py-2 bg-pink-300 sm:bg-white px-4 py-2 sm:px-0 shadow-2xl sm:shadow-none mb-5 sm:mb-0'>

    <div className='space-y-4'>
    <div className="flex justify-center items-center gap-2">
            <span className="text-2xl text-gray-700 hidden sm:block">
            <BiTask />
            </span>
            <h1 className="text-2xl font-semibold text-gray-700"> TaskBuddy </h1>
        </div>
        <div className='hidden sm:flex justify-center items-center gap-6'>
            <span onClick={() => setView(true)} className={` ${view ? 'border-b border-black': 'border-none'}  cursor-pointer flex justify-center items-center gap-2`}> <TfiViewList className='text-sm' /> <p> List </p>  </span>      
            <span onClick={() => setView(false)} className={` ${view ? 'border-none' : 'border-b border-black'} cursor-pointer text- flex justify-center items-center gap-2`}> <CiViewBoard />  <p> Board </p>  </span>
        </div>
    </div>
        
        <div className='space-y-2 sm:w-24'>
            <div className='flex flex-col justify-center items-center gap-2 relative'>
                <img src={session.pic} alt="img" className='sm:w-full sm:h-full w-14 h-14 p-2 sm:p-0 rounded-full sm:rounded-none sm:border border-black/10' />
                <p className='hidden sm:block font-semibold text-sm'> vinod Dhaware</p>
            </div>
            <div onClick={handleLogout} className='cursor-pointer hover:bg-pink-300 hidden sm:flex  justify-center items-center gap-2 border py-2 rounded-xl bg-pink-300/40'>
                <span> <BiLogOut /> </span>
                <p>Logout</p>
            </div>
        </div>

        {/* for mobile screen */}
        <div onClick={handleLogout} className='absolute text-[12px] sm:hidden cursor-pointer hover:bg-pink-300 right-20 flex  justify-center items-center gap-2 border  p-2 rounded-xl bg-pink-300/40'>
            <span> <BiLogOut /> </span>
            <p>Logout</p>
        </div>
      
    </div>
  )
}

export default Navbar
