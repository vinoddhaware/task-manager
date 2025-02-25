import React, { useState } from 'react'
import EditTask from './EditTask';
import { useTaskContext } from "../contextAPI/taskListContext";
import { RxCross2 } from "react-icons/rx";
import { MdLibraryAddCheck } from "react-icons/md";



const EditForMobileView = () => {
  const {taskList, setTaskList, selectedTaskId, handleCheckbox, handleAllCheckbox, handleDelete2, handleSelectAllStatus} = useTaskContext()
    const [toggle1, setToggle1] = useState(false) 
    const [toggle, setToggle] = useState(false) 
    const [addTask, setAddTask] = useState({
        id: '',
        task: "",
        description: "hello react",
        date: "",
        taskStatus: "",
        taskCategory: '',
        file: [],
        selectcategory: '',
      });

    const status = ['TO-DO', 'IN-PROGRESS', 'COMPLETED']

  return (
    <>
    <div className=' w-[90%] sm:w-[65%] md:w-[60%] lg:w-[50%] xl:w-[40%] flex  justify-between items-center mx-auto border border-black rounded-xl bg-black text-white px-4 py-3 mb-2'>
      <div className="flex justify-center items-center gap-2" >
      <div className={selectedTaskId.length > 0 ? 'block' : 'hidden'}>
      <span className='flex  justify-center items-center gap-2 border rounded-full px-4 md:px-6 md:py-1 text-[12px] sm:text-[16px] ' > 
      {selectedTaskId.length} Tasks Selected <RxCross2 /> </span>
      </div>
      <span onClick={handleAllCheckbox}> 
        {
          taskList.length === selectedTaskId.length && selectedTaskId.length > 0 ? <MdLibraryAddCheck className="text-[12px] sm:text-[16px] md:text-2xl  cursor-pointer text-green-700" /> : <MdLibraryAddCheck  className="text-[12px] sm:text-[16px] md:text-2xl  cursor-pointer"/> 
        } 
      </span>
      </div>

        <div onClick={() => setToggle1(!toggle1)}  className='md:px-6 md:py-1 text-[12px] sm:text-[16px]  relative rounded-full border px-2 cursor-pointer hover:bg-gray-900'>
            <span> Status </span>
            <div  className={` ${toggle1 ? 'block':'hidden'} z-10 absolute shadow-2xl bottom-12 right-1 rounded-lg  text-[12px]   w-28 bg-black text-white p-2 space-y-4`}>
                {
                  status.map((currStatus, i) => {
                    return <div key={i} onClick={() => handleSelectAllStatus(currStatus)} className={` ${currStatus === addTask.taskStatus ? 'bg-pink-400' : 'bg-transparent'} px-1 py-1 border border-gray-400 hover:bg-black/10 w-full cursor-pointer rounded-md`}>
                      <span> {currStatus} </span>
                    </div>
                  })
                }
               </div>
        </div>
        <div className='hidden rounded-full border px-2 hover:bg-gray-900 cursor-pointer'>
            <span> Edit </span>
        </div>
        <div onClick={() =>handleDelete2(selectedTaskId)} className='md:px-6 md:py-1 text-[12px] sm:text-[16px]  rounded-full border px-2 bg-[#3a1f23] text-[#e13838] cursor-pointer hover:bg-red-600/20'>
            <span> Delete </span>
        </div>
      
    </div>

    <EditTask toggle={toggle} setToggle={setToggle} />
    </>
  )
}

export default EditForMobileView
