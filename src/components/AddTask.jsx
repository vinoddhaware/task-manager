import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { FiCornerDownLeft } from 'react-icons/fi'
import { postApi } from '../api/FirebaseDB';
import { useTaskContext } from '../contextAPI/taskListContext';

const generateShortId = () => Date.now().toString(36);

const AddTask = ({setShowAddTask}) => {

  const {setTaskList} = useTaskContext()

  const uniqId = generateShortId()
    
    const [toggle1, setToggle1] = useState(false) 
    const [toggle2, setToggle2] = useState(false) 
    const [selectCategory, setSelectCategory] = useState(null);
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

    const categorySelect = (value) => {
        if (value) {
            setToggle2(false)
            setSelectCategory(value);
            setAddTask((prev) => ({
            ...prev,
            taskCategory: "Work",
            selectcategory: value,
            }));
        } else {
            setToggle2(false)
            setSelectCategory(value);
            setAddTask((prev) => ({
            ...prev,
            taskCategory: "Personal",
            selectcategory: value,
            }));
        }
    }

    const handleInputChange = (e) =>{
    const {name, value} = e.target
    setAddTask((prev) => ({...prev, [name]: value }))
    }   

    const handleFormSubmit = async(e) =>{
        e.preventDefault()

        if(!addTask.task){
          alert('Please add your task name') 
          return;
        }
        if(!addTask.description){
          alert('Please add some description') 
          return;
        }
        if(!addTask.date){
          alert('Please select the date') 
          return;
        }
        if(!addTask.taskStatus){
          alert('Please select the task status') 
          return;
        }
        if(!addTask.taskCategory){
          alert('Please choose your task category') 
          return;
        }
        
        // setTaskList((prev) => [...prev, {...addTask, id:uniqId}])
        try {
          const res = await postApi({...addTask, id: uniqId})
          if(res.status === 200){
              location.reload()            
              setShowAddTask(false)
              setAddTask({
                  id: '',
                  task: "",
                  description: "hello react",
                  date: "",
                  taskStatus: "",
                  taskCategory: '',
                  file: [],
                  selectcategory: '',
                })
                setSelectCategory(null)
          }
      } catch (error) {
          console.log(error);            
      }
    }


  return (
    <form onSubmit={handleFormSubmit}>
      <div className='text-sm flex justify-between items-center px-10 font-semibold text-gray-600 my-4'>
            <input onChange={handleInputChange} value={addTask.task} name='task' type="text" autoComplete='off' placeholder='Task Tile' className='border border-black px-2 py-1 rounded-full' />
            <div className=' px-2 py-1 border border-black rounded-full flex justify-center items-center gap-2'>
                <input onChange={handleInputChange} value={addTask.date} type="date" name="date" id="date" />
            </div>
            <div className='relative flex justify-center items-center p-3 h-6 w-6 border border-black rounded-full'>
               <span onClick={() => setToggle1(!toggle1)} className='text-lg cursor-pointer'> <BiPlus /> </span>
               <div  className={` ${toggle1 ? 'block':'hidden'} z-10 absolute shadow-2xl left-8 top-2 rounded-lg text-[12px] w-28 bg-white p-2 space-y-4 text-black`}>
                {
                  status.map((currStatus, i) => {
                    return <div key={i} onClick={() =>setAddTask(prev => ({...prev, taskStatus:currStatus}), setToggle1(!toggle1))} className={` ${currStatus === addTask.taskStatus ? 'bg-pink-400' : 'bg-transparent'} px-1 py-1 border border-gray-400 hover:bg-black/10 w-full cursor-pointer rounded-md`}>
                      <span> {currStatus} </span>
                    </div>
                  })
                }
               </div>
            </div>
            <div className='relative flex justify-center items-center p-3 h-6 w-6 border border-black rounded-full mr-60'>
               <span onClick={() => setToggle2(!toggle2)} className='text-lg cursor-pointer'> <BiPlus /> </span>
               <div className={`${toggle2 ? 'block':'hidden'} z-10 absolute shadow-2xl left-8 top-2 rounded-lg text-[12px] w-24 bg-white p-2 space-y-4 text-black`}>

               <div className=" flex flex-col justify-center items-center space-y-2 text-[12px] font-semibold ">
                <span
                  onClick={() => categorySelect(true)}
                  className={` ${selectCategory ? 'bg-pink-400' : 'bg-transparent' } cursor-pointer px-1 py-1 border border-gray-400 text-black w-full hover:bg-black/10 rounded-md`}
                >
                  Work
                </span>
                <span
                  onClick={() => categorySelect(false)}
                  className={`  ${selectCategory === false ? 'bg-pink-400' : 'bg-transparent' } cursor-pointer px-1 py-1 border border-gray-400 text-black w-full hover:bg-black/10 rounded-md`}
                >
                  Personal
                </span>
              </div>
               </div>
            </div>
      </div>
      <div className='px-10 space-x-2 flex'> 
        <button type='submit' className='px-4 py-1 bg-[#7b1984] rounded-full text-white flex justify-center items-center gap-3'> Add <FiCornerDownLeft /> </button>
        <span onClick={()=>setShowAddTask(false)} className='cursor-pointer px-4 py-1 bg-white rounded-full text-black border border-black'> CANCEL </span>
      </div>
    </form>
  )
}

export default AddTask
