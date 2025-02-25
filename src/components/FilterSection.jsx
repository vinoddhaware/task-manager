import React, { useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import { useTaskContext } from '../contextAPI/taskListContext'

const FilterSection = () => {

  const {date, setDate, search, setSearch,categorySearch, setCategorySearch, taskList, searchTaskList, setSearchTaskList} = useTaskContext()

  const [toggle, setToggle] = useState(false) 
   

  return (
    <>
    <div className='w-[90%] mx-auto flex sm:flex-row flex-col-reverse justify-between sm:items-center text-sm'>
       
        <div className='flex sm:flex-row flex-col  sm:items-center gap-2 mt-2'>
            <p>Filter by: </p>
            <div className='space-x-2'>
                <select onChange = {(e) => setCategorySearch(e.target.value)} value={categorySearch} name="catagory" id="catagory" className='border border-black/50 rounded-full px-2 py-1 outline-blue-400'>
                    <option value="all"> All Category </option>
                    <option value="Work"> Work </option>
                    <option value="Personal"> Personal </option>
                </select>
                <input onChange={(e) => setDate(e.target.value)} value={date} type="date" name="date" id="date" className=' w-28 md:w-32 border border-black/50 rounded-full px-2 py-1 outline-blue-500' />
            </div>
            <div className="bg-white sm:hidden flex px-4 py-2 mt-2 border rounded-full border-[#333] focus-within:border-blue-500 overflow-hidden md:w-52 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-gray-600 mr-3">
            <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
            </svg>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search" className="w-full outline-none text-sm placeholder:font-semibold placeholder:text-black/70" />
        </div>
        </div>

        <div className='flex gap-2 items-center justify-end'>   
        <div className="bg-white hidden sm:flex px-4 py-2 border rounded-full border-[#333] focus-within:border-blue-500 overflow-hidden w-40 md:w-52 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-gray-600 mr-3">
          <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
          </path>
        </svg>
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search" className="w-full outline-none text-sm placeholder:font-semibold placeholder:text-black/70" />
        </div>
        <div>
            <button onClick={() => setToggle(true)} className='hover:bg-[#7b1984e1] px-5 md:px-10 py-3 bg-[#7b1984] rounded-full text-white font-semibold'> ADD TASK </button>
        </div>

        </div>
      
    </div>

    <CreateTask toggle = {toggle} setToggle = {setToggle} />
    </>
  )
}

export default FilterSection
