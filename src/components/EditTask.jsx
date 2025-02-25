import React, { useCallback, useState } from 'react'
import { CiCircleList } from "react-icons/ci";
import { LuAsterisk } from "react-icons/lu";
import { PiListNumbers } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useDropzone } from "react-dropzone";
import { putApi } from '../api/FirebaseDB';

const EditTask = ({toggle, setToggle, singleEditData}) => {
    if(!toggle) return null
    

    const { id, task, date, taskStatus, taskCategory, description, file, selectcategory} = singleEditData;
    
    const [activityAndDetails, setActivityAndDetails] = useState(true)
    const [selectEditCategory, setSelectEditCategory] = useState(null)
    const [editTask, setEditTask] = useState({
        id: id,
        task: task,
        description: description,
        date: date,
        taskStatus: taskStatus,
        taskCategory: taskCategory,
        file: file,
        selectcategory: selectcategory,  
    });

    //close create todo popup
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setToggle(false);
        }
    };
    
    const maxChars = 300;
    const handleTextChange = (e) => {
      if (e.target.value.length <= maxChars) {
        setEditTask((prev) => ({ ...prev, description: e.target.value }));
      }
    };

    const categorySelect = (value) => {
        if (value) {
          setSelectEditCategory(value);
          setEditTask((prev) => ({
            ...prev,
            taskCategory: "Work",
            selectcategory: value,
          }));
        } else {
          setSelectEditCategory(value);
          setEditTask((prev) => ({
            ...prev,
            taskCategory: "Personal",
            selectcategory: value,
          }));
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: useCallback((files) => {
            return setEditTask((prev) => ({
            ...prev,
            file: files.map((currPhoto) => URL.createObjectURL(currPhoto)),
            }));
        }),
    });
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTask((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        try {
          const res = await putApi(editTask.id, editTask)
          if(res.status === 200){
            location.reload()
            setToggle(false)                
          }
        } catch (error) {
          console.log(error);
          
        }
        // let updatedData = taskList.map((currData) => currData.id === editTask.id ? editTask : currData)
        // setTaskList(updatedData)   
    }


  return (

<div  onClick={handleClose} className="z-10 fixed inset-0 sm:bg-black  bg-[#747474] sm:bg-opacity-25 flex justify-center">
<form
      onSubmit={handleFormSubmit}
      className="bg-white w-full bottom-0 sm:w-[90%] lg:w-[80%] sm:my-6 overflow-hidden rounded-t-3xl sm:rounded-3xl absolute"
    >
      {/* header */}
      <div className="flex justify-end items-center border-b border-black/20 p-4 sm:p-6">
        <button onClick={() => setToggle(false)} className="text-xl">
          <RxCross2 />
        </button>
      </div>

      <div className=' md:hidden flex justify-between items-center gap-4 px-4 py-4'>
            <span onClick={() => setActivityAndDetails(true)} className={` ${activityAndDetails ? 'text-white bg-black/85' : 'bg-transparent'} border border-black w-full py-1 sm:py-1 flex justify-center items-center rounded-full `}> DETAILS </span>
            <span onClick={() => setActivityAndDetails(false)} className={`${activityAndDetails ? 'bg-transparent' : 'text-white bg-black/85'} border border-black w-full py-1 sm:py-1 flex justify-center items-center rounded-full `}> ACTIVITY </span>
          </div>


      {/* container */}
      <div className="flex h-[350px] sm:h-[270px] lg:h-[300px] xl:h-[360px] sm:my-4">
        {/* left part */}
        <div className={`${activityAndDetails ? 'block w-full' : 'hidden md:block'} md:w-[60%]  xl:w-[70%] h-[350px] sm:h-[310px]
        lg:h-[340px] xl:h-[400px] overflow-y-scroll space-y-4 px-4 pb-4`}>
            {/* task title */}
            <input
            onChange={handleInputChange}
            value={editTask.task}
            type="text"
            name="task"
            className="border-2 w-full p-2 rounded-lg bg-gray-400/10"
            placeholder="Task title"
            autoComplete="off"
          />
          {/* textarea */}
          <div className="border rounded-lg shadow-sm bg-white bg-gray-400/10">
            <div className="flex text-gray-600 px-4 space-x-4 bg-gray-400/10">
              <textarea
                placeholder="description"
                value={editTask.description}
                onChange={handleTextChange}
                name="description"
                className="pb-10 pt-2 w-full border-none outline-none resize-none placeholder:text-gray-700 bg-gray-400/10"
              ></textarea>
            </div>
            <div className="flex justify-between items-center bg-gray-400/10">
              <div className="flex justify-center items-center space-x-4 text-gray-700 mb-2">
                <button className="hover:text-black font-bold">B</button>
                <button className="hover:text-black">/</button>
                <button className="hover:text-black line-through">S</button>
                <button className="hover:text-black">
                  <PiListNumbers />
                </button>
                <button className="hover:text-black">
                  <CiCircleList />
                </button>
              </div>
              <div className="text-right text-sm text-gray-400">
                {editTask.description.length}/{maxChars} characters
              </div>
            </div>
          </div>

          {/* category due-date task-status  */}
          <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center sm:text-sm text-gray-700 py-4">
            <div className="space-y-3">
              <p className="flex">
                Task Category
                <span className="text-xs">
                  <LuAsterisk />
                </span>
              </p>

              <div className="space-x-2 text-[12px] font-semibold">
                <span
                  onClick={() => categorySelect(true)}
                  className={` ${
                    editTask.selectcategory ? "bg-[#7b1984] text-white" : "bg-transparent"
                  } cursor-pointer px-6 py-2  sm:px-2 lg:px-4 sm:py-1 border border-gray-400 rounded-full text-black`}
                >
                  Work
                </span>
                <span
                  onClick={() => categorySelect(false)}
                  className={` ${
                    editTask.selectcategory === false ? "bg-[#7b1984] text-white" : "bg-transparent"
                  } cursor-pointer px-6 py-2 sm:px-2 lg:px-4 sm:py-1 border border-gray-400 rounded-full text-black`}
                >
                  Personal
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex">
                Due on
                <span className="text-xs">
                  <LuAsterisk />
                </span>
              </p>
              <input
                onChange={handleInputChange}
                value={editTask.date}
                type="date"
                name="date"
                id="date"
                placeholder="dd/mm/yyyy"
                className="uppercase border border-gray-400 rounded-md px-6 py-1 sm:py-0 md:px-1 lg:px-3"
              />
            </div>
            <div className="space-y-2">
              <p className="flex">
                Task Status
                <span className="text-xs">
                  <LuAsterisk />
                </span>
              </p>
              <select
                onChange={handleInputChange}
                value={editTask.taskStatus}
                name="taskStatus"
                id="taskStatus"
                className="border border-gray-400 rounded-md px-8 py-1 sm:py-0 md:px-1 lg:px-4"
              >
                <option disabled value="choose">
                  Choose
                </option>
                <option value="TO-DO">TO-DO</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          {/* Attachment */}
          <div className="text-sm text-gray-700  space-y-2 ">
            <p>Attachment</p>
            <div
              {...getRootProps()}
              className="h-10 bg-gray-400/10 rounded-lg flex justify-center items-center border text-[12px] gap-1"
            >
              <div>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p> Drop the files here ... </p>
                ) : (
                  <p>    
                    Drop your files here or
                    <span className="text-blue-600 underline cursor-pointer">
                      Update
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {editTask.file?.map((currPhotos, i) => {
              return (
                <img
                  key={i}
                  src={currPhotos}
                  alt="img"
                  className="h-24 w-24 border border-black/60"
                />
              );
            })}
          </div>
        </div>

        {/* right part */}
        <div className={` ${activityAndDetails ? 'hidden md:block' : 'block w-full px-4 md:px-0 text-lg'}  md:w-[40%] xl:w-[30%] md:block `}>
          <p className="text-lg text-gray-700 p-2"> Activity </p>
          <div className="bg-gray-400/25 h-full  p-2 space-y-4 text-[10px] lg:text-[11px]">
            <span className="flex justify-between items-center">
              <p> You created this task </p>
              <p> {date} at 1.15 pm </p>
            </span>
            <span className="flex justify-between">
              <p className="w-52 md:w-[155px] lg:w-48">
                You changed status from in progress to complete
              </p>
              <p> {date} at 1.15 pm </p>
            </span>
            <span className="flex justify-between items-center">
              <p> You uploaded file </p>
              <p> {date} at 1.15 pm </p>
            </span>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="z-50 relative bottom-0 bg-gray-400/25 rounded-b-xl flex justify-end items-center px-4 py-2 md:py-6 sm:mt-11 border-t border-black/20 ">
        <button
          onClick={() => setToggle(false)}
          className="px-5 py-2 bg-white text-black rounded-full font-semibold border"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-[#7b1984] text-white rounded-full font-semibold border"
        >
          UPDATE
        </button>
      </div>
    </form>
    </div>
  )
}

export default EditTask
