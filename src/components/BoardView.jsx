import React from 'react'
import { useTaskContext } from '../contextAPI/taskListContext'
import BoardCard from './BoardCard'

const BoardView = () => {

    const {todo, inProgress, completed} = useTaskContext()

  return (
    <div className='w-[90%] mx-auto grid grid-cols-3 text-sm gap-2 md:gap-6 my-4'>
        <div className='bg-gray-400/20 rounded-xl h-[100vh] p-4'>
            <span className='px-2 py-1 rounded-[4px] bg-[#fac3ff]'> TO-DO </span>

            <div className='my-6'> 
            {
                  todo.map((currData) => {                                        
                    return <BoardCard key={currData.id} singleEditData = {currData} />
                  })
                }
            </div>
            
            <div className={` ${todo.length > 0 ? 'hidden' : 'block'  } flex justify-center items-center h-lvh `}>
            <p> No Task in To-Do </p>
            </div>
        </div>
        <div className='bg-gray-400/20 rounded-xl h-[100vh] p-4'>
            <span className='px-2 py-1 rounded-[4px] bg-[#85d9f1]'> IN-PROGRESS </span>
            
            <div className='my-6'> 
            {
                  inProgress.map((currData) => {                                        
                    return <BoardCard key={currData.id} singleEditData = {currData} />
                  })
                }
            </div>
            
            <div className={` ${inProgress.length > 0 ? 'hidden' : 'block'  } flex justify-center items-center h-lvh `}>
            <p> No Task in To-Do </p>
            </div>

        </div>
        <div className='bg-gray-400/20 rounded-xl h-[100vh] p-4'>
            <span className='px-2 py-1 rounded-[4px] bg-[#a2d6a0]'> COMPLETED </span>
            
            <div className='my-6'> 
            {
                  completed.map((currData) => {                                        
                    return <BoardCard key={currData.id} singleEditData = {currData} />
                  })
                }
            </div>
            
            <div className={` ${ completed.length > 0 ? 'hidden' : 'block'  } flex justify-center items-center h-lvh`}>
            <p> No Task in To-Do </p>
            </div>

        </div>

        <div>
        </div>
      
    </div>
  )
}

export default BoardView
