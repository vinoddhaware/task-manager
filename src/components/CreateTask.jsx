import React, { useCallback, useId, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { CiCircleList } from "react-icons/ci";
import { FaListCheck } from "react-icons/fa6";
import { LuAsterisk } from "react-icons/lu";
import { PiListNumbers } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { postApi } from '../api/FirebaseDB';

const CreateTask = ({ toggle, setToggle }) => {
    if(!toggle) return null

    const uniqId = useId()

    const [selectcategory, setSelectCategory] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [createTask, setCreateTask] = useState({
      id: '',
      task: "",
      description: "",
      date: "",
      taskStatus: "",
      taskCategory: "",
      file: [],
      selectcategory: "",  
    });

    //close create todo popup
    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
          setToggle(false);
        }
    };

    //select category
    const categorySelect = (value) => {
        if (value) {
          setSelectCategory(value);
          setCreateTask((prev) => ({
            ...prev,
            taskCategory: "Work",
            selectcategory: value,
          }));
        } else {
          setSelectCategory(value);
          setCreateTask((prev) => ({
            ...prev,
            taskCategory: "Personal",
            selectcategory: value,
          }));
        }
    }; 

    // for description
    const maxChars = 300;
    const handleTextChange = (e) => {
        if (e.target.value.length <= maxChars) {
          setCreateTask((prev) => ({ ...prev, description: e.target.value }));
        }
    };   
    
    // react dropZone for images uploads
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: useCallback((files) => {
          return (
            setUploadedPhotos(files),
            setCreateTask((prev) => ({
              ...prev,
              file: files.map((currPhoto) => URL.createObjectURL(currPhoto)),
            }))
          );
        }),
    });    
    
    // user input data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateTask((prev) => ({ ...prev, [name]: value }));
    };
    
    // form submission
    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        if(!createTask.task && !createTask.description && !createTask.date && !createTask.taskStatus &&!createTask.taskCategory){
          alert('Please add your task') 
          return;
        }
        if(!createTask.task){
          alert('Please add your task name') 
          return;
        }
        if(!createTask.description){
          alert('Please add some description') 
          return;
        }
        if(!createTask.date){
          alert('Please select the date') 
          return;
        }
        if(!createTask.taskStatus){
          alert('Please select the task status') 
          return;
        }
        if(!createTask.taskCategory){
          alert('Please choose your task category') 
          return;
        }
        try {
          const res = await postApi({...createTask, id: uniqId})
          if(res.status === 200){
              location.reload()
              setToggle(false)               
          }
      } catch (error) {
          console.log(error);            
      }
    }
    

  return (
    <div
      onClick={handleClose}
      className="z-50 fixed inset-0 sm:bg-black  bg-[#747474] sm:bg-opacity-25 flex justify-center">
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        action="/CreateTask"
        className="bg-white w-full sm:w-[80%] md:w-[70%] lg:w-[50%]  bottom-0 sm:bottom-5 xl:bottom-10 2xl:bottom-40 overflow-hidden rounded-t-3xl sm:rounded-3xl absolute"
      >
        {/* header */}
        <div className="flex justify-between px-6 items-center border-b border-black/20 py-4">
          <p className="text-2xl"> Create Task </p>
          <button onClick={() => setToggle(false)} className="text-xl">
            <RxCross2 />
          </button>
        </div>

        {/* containt */}
        <div className="bg-white w-full px-6 py-3 rounded-3xl space-y-4 h-[400px] lg:h-[462px] overflow-y-scroll">
          {/* task title */}
          <input
            onChange={handleInputChange}
            value={createTask.task}
            type="text"
            name="task"
            className="border-2 w-full p-2 rounded-lg bg-gray-400/10"
            placeholder="Task title"
            autoComplete="off"
          />

          {/* textara */}
          <div className="border rounded-lg shadow-sm bg-white">
            <div className="flex text-gray-500 px-4 bg-gray-100/80">
              <span className=" mt-1.5 text-sm">
                <FaListCheck />
              </span>
              <textarea
                name="description"
                placeholder="Description"
                rows={1}
                value={createTask.description}
                onChange={handleTextChange}
                className="pb-14 px-2 w-full border-none outline-none resize-none bg-gray-100/80"
              ></textarea>
            </div>
            <div className="flex justify-between items-center bg-gray-400/10">
              <div className="flex justify-center items-center space-x-4 text-gray-700 mb-2  mx-4">
                <span className="cursor-pointer hover:text-black font-bold">B</span>
                <span className="cursor-pointer hover:text-black">/</span>
                <span className="cursor-pointer hover:text-black line-through">S</span>
                <span className="hover:text-black pb-1">|</span>
                <span className="hover:text-black">
                  <PiListNumbers />
                </span>
                <span className="hover:text-black">
                  <CiCircleList />
                </span>
              </div>
              <div className="text-right text-sm text-gray-400 mx-4">
                {createTask.description.length}/{maxChars} characters
              </div>
            </div>
          </div>

          {/* category due-date task-status  */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center text-sm text-gray-700 sm:py-4">
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
                    selectcategory ? "bg-[#7b1984] text-white" : "bg-transparent"
                  } cursor-pointer px-4 py-1 border border-gray-400 rounded-full text-black`}
                >
                  Work
                </span>
                <span
                  onClick={() => categorySelect(false)}
                  className={` ${
                    selectcategory === false ? "bg-[#7b1984] text-white" : "bg-transparent"
                  } cursor-pointer px-4 py-1 border border-gray-400 rounded-full text-black`}
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
                value={createTask.date}
                type="date"
                name="date"
                id="date"
                placeholder="dd/mm/yyyy"
                className="uppercase border border-gray-400 rounded-md px-3"
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
                value={createTask.taskStatus}
                name="taskStatus"
                id="taskStatus"
                className="border border-gray-400 rounded-md px-4"
              >
                <option disabled> Choose </option>
                <option value="TO-DO">TO-DO</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          {/* Attachment drag and drop */}
          <div className="text-sm text-gray-700  space-y-2 ">
            <p>Attachment</p>
            <div
              {...getRootProps()}
              className="h-10 bg-gray-400/10 rounded-lg flex justify-center items-center border text-[12px] gap-1"
            >
              <div>
                <input name="photo" {...getInputProps()} />
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

          {/* uploaded Photos */}
          <div className="flex gap-4">
            {uploadedPhotos &&
              uploadedPhotos.length > 0 &&
              uploadedPhotos.map((currPhotos, i) => {
                return (
                  <img
                    key={i}
                    src={URL.createObjectURL(currPhotos)}
                    alt="img"
                    className="cursor-pointer h-24 w-24 border border-black/60"
                  />
                );
              })}
          </div>
        </div>

        {/* footer */}
        <div className="bg-gray-400/10 rounded-b-xl px-4 py-3 flex justify-end items-center relative bottom-0 ">
          <button
            onClick={() => setToggle(false)}
            className="px-5 py-2 bg-white text-black rounded-full font-semibold border"
          >
            CANCEL
          </button>
          <button
            id="create"
            type="submit"
            className="px-5 py-2 bg-[#b685bb] text-white rounded-full font-semibold border"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
