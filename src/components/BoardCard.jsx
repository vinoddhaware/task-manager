import React, { useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiDeleteBinFill } from 'react-icons/ri'
import EditTask from './EditTask'
import { deleteApi } from '../api/FirebaseDB'
import { useTaskContext } from '../contextAPI/taskListContext'

const BoardCard = ({singleEditData}) => {

    const {taskList, setTaskList} = useTaskContext()
    const [toggle, setToggle] = useState(false) 
    const [showEditDel, setShowEditDel] = useState(false) 

    const { id, task, date, taskCategory } = singleEditData;

  const handleDelete = async(id) => {
      try {
        const res = await deleteApi(id)
        if(res.status === 200){
          const updatedTodo = taskList.filter((currData) => currData.id !== id)          
          return setTaskList(updatedTodo)
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
    <div  className='bg-white p-4 my-4 rounded-lg space-y-11'>
        <div className='relative flex justify-between items-center'>
            <p className='text-base font-semibold'> {task} </p>
            <button onClick={() => setShowEditDel(!showEditDel)} ><HiDotsHorizontal /></button>
           
            <div className={` ${showEditDel ? 'block' : 'hidden'} z-10 absolute shadow-2xl right-0 top-4 rounded-lg text-[12px] bg-white border border-black/10 text-black text-sm font-semibold p-2 space-y-2`}>
                <span onClick={() => {(setToggle(true), setShowEditDel(false))}} className='cursor-pointer flex items-center gap-2 pr-10 hover:bg-black/25 p-1 rounded-md'> 
                    <BiSolidEditAlt />
                    <p> Edit </p>
                </span>
                <span onClick={() => handleDelete(id)} className='cursor-pointer flex items-center gap-2 pr-10 text-red-600 hover:bg-black/25 p-1 rounded-md'> 
                    <RiDeleteBinFill />
                    <p> Delete </p>
                </span>
                </div>
        </div>

        <div className='flex justify-between items-center text-[12px]'>
            <p> {taskCategory} </p>
            <p> {date} </p>
        </div>
      
    </div>
    <EditTask toggle={toggle} setToggle={setToggle} singleEditData = {singleEditData} />
    </>
  )
}

export default BoardCard
