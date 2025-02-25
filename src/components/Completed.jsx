import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CompetedList from './CompetedList'
import { useTaskContext } from '../contextAPI/taskListContext';

const Completed = () => {

  const {completed, handleDrop} = useTaskContext()

  const [showTask, setTask] = useState(true) 
  
  return (
    <div className="text-sm sm:text-base">
      <div className={`${showTask ? 'rounded-t-xl':'rounded-xl'} flex justify-between items-center bg-[#53c24f] p-4 font-bold`}>
        <div className='flex gap-6'>
        <p> Completed  ({completed.length}) </p>
        <p className={` ${completed.length > 0 ? 'hidden' : 'hidden sm:block'} font-semibold`} >- No Completed Task Available </p>
        </div>
        <span onClick={()=>setTask(!showTask)} className='text-2xl font-semibold cursor-pointer'> 
          { !showTask ? <IoIosArrowDown /> : <IoIosArrowUp /> } 
          </span>
      </div>
      <div className={`${ completed.length >= 0 && showTask  ? 'block':'hidden'} bg-[#668fdd38] rounded-b-xl`}>        
        <div onDrop ={(e)=>handleDrop(e,'COMPLETED')} onDragOver={(e)=>e.preventDefault()} className=' pb-2'> 
          {
            completed.map((currData) => <CompetedList key={currData.id} completedData = {currData} />  )
          }           
          </div>      
        <div className={`${completed.length > 0 ? 'hidden' : 'block'} text-gray-600 flex justify-center items-center pb-8`}>
          <p> No Task in Completed </p>
        </div>
      </div>
    </div>
  )
}

export default Completed
