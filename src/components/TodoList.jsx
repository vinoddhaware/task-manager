import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { RiDeleteBinFill } from "react-icons/ri";
import EditTask from "./EditTask";
import { useTaskContext } from "../contextAPI/taskListContext";
import { deleteApi } from "../api/FirebaseDB";

const TodoList = ({ todoData}) => {
  const { id, task, date, taskStatus, taskCategory } = todoData;
  
  const {taskList, setTaskList, selectedTaskId, handleCheckbox, handleDragStart, handleDragEnd} = useTaskContext()
  const [toggle, setToggle] = useState(false);
  const [showEditDel, setShowEditDel] = useState(false);

  const handleDelete = async(id) => {
    switch (taskStatus) {
      case 'TO-DO':
        try {
          const res = await deleteApi(id)
          if(res.status === 200){
            const updatedTodo = taskList.filter((currData) => currData.id !== id)          
            return setTaskList(updatedTodo)
          }
        } catch (error) {
          console.log(error);
        }
      default:
        return  taskStatus
    }
  };

  return (
    <>
      <ul draggable onDragStart={(e) =>handleDragStart(e, todoData, id)} onDragEnd={(e) => handleDragEnd(e)} className=" flex p-2 sm:py-2 sm:px-4 font-semibold text-gray-600  sm:cursor-grab sm:active:opacity-70 sm:active:border sm:active:border-gray-900 sm:active:shadow-[2px_1px_10px_black] " >
        <li className="w-[300px] flex items-center space-x-2 px-4 sm:px-0 ">
          <input onChange = {(e)=>handleCheckbox(e)} value={id} checked = {selectedTaskId.includes(id)} type="checkbox" name="taskName" id="taskName" />
          <span className="text-lg text-gray-600 hidden sm:block">
            <PiDotsSixVerticalBold />
          </span>
          <span className={`text-lg text-purple-600`}>
            <FaCheckCircle />
          </span>
          <p> {task} </p>
        </li>
        <li className="w-64 hidden sm:block">{date}</li>
        <li className="w-64 hidden sm:block">
          <span className="bg-purple-600 px-2 py-1 text-white">{taskStatus}</span>
        </li>
        <li className="w-64 flex justify-between items-center">
          {taskCategory}
          <div className="relative">
            <button
              onClick={() => setShowEditDel(!showEditDel)}
              className="text-lg"
            >
              <HiDotsHorizontal />
            </button>
            <div
              className={` ${
                showEditDel ? "block" : "hidden"
              } absolute shadow-2xl right-0 top-4 rounded-lg text-[12px] bg-white text-black text-sm font-semibold p-2 space-y-2 z-10`}
            >
              <span
                onClick={() => {
                  setToggle(true), setShowEditDel(false);
                }}
                className="cursor-pointer flex items-center gap-2 pr-10 p-1 rounded-md hover:bg-black/25"
              >
                <BiSolidEditAlt />
                <p> Edit </p>
              </span>
              <span
                onClick={() => handleDelete(id)}
                className="cursor-pointer flex items-center gap-2 pr-10 text-red-600 hover:bg-black/25 p-1 rounded-md"
              >
                <RiDeleteBinFill />
                <p> Delete </p>
              </span>
            </div>
          </div>
        </li>
      </ul>

      <EditTask toggle={toggle} setToggle={setToggle} singleEditData = {todoData} />
    </>
  );
};

export default TodoList;