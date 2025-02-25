import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import AddTask from "./AddTask";
import TodoList from "./TodoList";
import { useTaskContext } from "../contextAPI/taskListContext";
import DropArea from "./DropArea";

const Todo = () => {

    const {todo, handleDrop} = useTaskContext()

    const [showAddTask, setShowAddTask] = useState(false) 
    const [showTask, setTask] = useState(true) 

  return (       
          <div className="text-sm sm:text-base">  
            <div className={`${showTask ? 'rounded-t-xl':'rounded-xl'} flex justify-between items-center bg-[#bf53c9] p-4 font-bold`}>
            <div className='flex gap-6'>
              <p> Todo  ({todo.length}) </p>
              <p className={`${todo.length > 0 ? 'hidden' : 'hidden sm:block'}  font-semibold`} >- No Task Available - Create new one </p>
            </div>
              <span onClick={()=>setTask(!showTask)} className='text-2xl font-semibold cursor-pointer'> 
                { !showTask ? <IoIosArrowDown /> : <IoIosArrowUp /> } 
               </span>
            </div>

            <div className={`${ todo.length >= 0 && showTask  ? 'block':'hidden'} bg-[#668fdd38] rounded-b-xl`}>        
              <div className={` ${showAddTask ? 'border-b border-black/20':'border-none'} hidden sm:flex items-center px-10 py-4 gap-2 font-semibold text-gray-600 `}>
                <span onClick={() => setShowAddTask(!showAddTask)} className='cursor-pointer text-[#7b1984]'> <FaPlus /> </span>
                <button onClick={() => setShowAddTask(!showAddTask)}> ADD TASK </button>
              </div>
              {/* Add task */}
              <div className={`${showAddTask ? 'block pb-4':'hidden'}`}> 
                <AddTask setShowAddTask = {setShowAddTask} /> 
              </div>

              {/* TodoList  ---  TO-DO */}
              <div onDrop ={(e)=>handleDrop(e,'TODO')} onDragOver={(e)=>e.preventDefault()} className='pb-2'> 
                {
                  todo.map((currData) => <TodoList key={currData.id}  todoData = {currData} /> )
                } 
                </div>      
              <div className={`${todo.length > 0 ? 'hidden' : 'block'} text-gray-600 flex justify-center items-center pb-8`}>
                <p> No Task in To-Do </p>
              </div>
            </div>
          
          </div>


  );
};

export default Todo;
