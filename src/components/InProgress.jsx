import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import InProgressList from './InProgressList';
import { useTaskContext } from '../contextAPI/taskListContext';
import DropArea from './DropArea';

const InProgress = () => {

    const {inProgress, handleDrop} = useTaskContext()

    const [showTask, setTask] = useState(true) 
  
    return (
    <div className="text-sm sm:text-base">
      <div className={`${showTask ? 'rounded-t-xl':'rounded-xl'} flex justify-between items-center bg-[#53afc9] p-4 font-bold`}>
      <div className='flex gap-6'>
        <p> In-Progress  ({inProgress.length}) </p>
        <p className={` ${inProgress.length > 0 ? 'hidden' : 'hidden sm:block'}  font-semibold`} >- No Pending Task Available  </p>
        </div>
        <span onClick={()=>setTask(!showTask)} className='text-2xl font-semibold cursor-pointer'> 
          { !showTask ? <IoIosArrowDown /> : <IoIosArrowUp /> } 
          </span>
      </div>
      <div className={`${ inProgress.length >= 0 && showTask  ? 'block':'hidden'} bg-[#668fdd38] rounded-b-xl`}>        
        <div onDrop ={(e)=>handleDrop(e,'IN-PROGRESS')} onDragOver={(e)=>e.preventDefault()} className=' pb-2'> 
            {
              inProgress.map((currData) => <InProgressList key={currData.id} inProgressData = {currData} />)
            }
          </div>      
        <div className={`${inProgress.length > 0 ? 'hidden' : 'block'} text-gray-600 flex justify-center items-center pb-8`}>
          <p> No Task in In-Progress </p>
        </div>
      </div>
    </div>
  )
}

export default InProgress
